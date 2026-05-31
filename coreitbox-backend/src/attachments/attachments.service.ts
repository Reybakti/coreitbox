import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';

import * as Minio from 'minio';

@Injectable()
export class AttachmentsService {
  private minioClient: Minio.Client;

  constructor(
    private readonly prisma: PrismaService,
  ) {
    this.minioClient =
      new Minio.Client({
        endPoint:
          process.env.MINIO_ENDPOINT!,
        port: Number(
          process.env.MINIO_PORT,
        ),
        useSSL:
          process.env.MINIO_USE_SSL ===
          'true',
        accessKey:
          process.env.MINIO_ACCESS_KEY!,
        secretKey:
          process.env.MINIO_SECRET_KEY!,
      });
  }

  async upload(
    ticketId: string,
    file: Express.Multer.File,
    userId: string,
  ) {
    const ticket =
      await this.prisma.ticket.findUnique({
        where: {
          id: ticketId,
        },
      });

    if (!ticket) {
      throw new NotFoundException(
        'Ticket tidak ditemukan',
      );
    }

    const fileName =
      `${Date.now()}-${file.originalname}`;

    await this.minioClient.putObject(
      process.env.MINIO_BUCKET!,
      fileName,
      file.buffer,
      file.size,
      {
        'Content-Type':
          file.mimetype,
      },
    );

    const attachment =
      await this.prisma.attachment.create({
        data: {
          ticketId,
          fileName,
          originalName:
            file.originalname,
          mimeType:
            file.mimetype,
          fileSize:
            file.size,
          filePath:
            fileName,
        },
      });

    await this.prisma.ticketActivity.create({
      data: {
        ticketId,
        userId,
        activityType:
          'ATTACHMENT_UPLOAD',
        description:
          `Upload file ${file.originalname}`,
      },
    });

    return attachment;
  }

  async findAll(ticketId: string) {
    return this.prisma.attachment.findMany({
      where: {
        ticketId,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async getFileUrl(
    attachmentId: string,
  ) {
    const attachment =
      await this.prisma.attachment.findUnique({
        where: {
          id: attachmentId,
        },
      });

    if (!attachment) {
      throw new NotFoundException(
        'Attachment tidak ditemukan',
      );
    }

    const url =
      await this.minioClient.presignedGetObject(
        process.env.MINIO_BUCKET!,
        attachment.fileName,
        60 * 60,
      );

    return {
      id: attachment.id,
      fileName:
        attachment.originalName,
      url,
      expiresIn:
        '1 hour',
    };
  }

  async remove(id: string) {
    const attachment =
      await this.prisma.attachment.findUnique({
        where: {
          id,
        },
      });

    if (!attachment) {
      throw new NotFoundException(
        'Attachment tidak ditemukan',
      );
    }

    await this.minioClient.removeObject(
      process.env.MINIO_BUCKET!,
      attachment.fileName,
    );

    await this.prisma.attachment.delete({
      where: {
        id,
      },
    });

    return {
      message:
        'Attachment berhasil dihapus',
    };
  }
}