import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateVideoDto } from './dto/create-video.dto';
import { UpdateVideoDto } from './dto/update-video.dto';
import { Video, VideoDocument } from './schemas/video.schema';

@Injectable()
export class VideoService {
  constructor(
    @InjectModel(Video.name) private videoModel: Model<VideoDocument>,
  ) {}

  async create(createVideoDto: CreateVideoDto, admin): Promise<Video> {
    let video: Video = {
      ...createVideoDto,
      createdBy: admin,
      createDate: new Date(),
    };

    const newVideo = new this.videoModel(video);
    return await newVideo.save();
  }

  async getPaginate(pageSize) {
    let allCount = await this.videoModel.count({});
    let paginate = {
      pageSize: pageSize,
      maxPage: Math.ceil(allCount / pageSize),
    };
    return paginate;
  }

  async findById(id: string): Promise<Video> {
    let query = { _id: id };
    return await this.videoModel.findOne(query);
  }

  async findWithPaginate(
    field: string,
    pageSize: number,
    pageNum: number,
  ): Promise<Video[]> {
    let query = {};

    let projection = {};
    if (field) {
      field.split(',').forEach((eachField) => {
        projection[eachField] = 1;
      });
    }

    let option = { skip: (pageNum - 1) * pageSize, limit: pageSize };
    return await this.videoModel.find(query, projection, option);
  }

  async update(id: string, updateVideoDto: UpdateVideoDto) {
    const video = await this.findById(id); // ใช้ Funtion ร่วมกับในตัวมันเองได้เลย, มีการ throw ได้ตามปกติ
    if (!video) throw new NotFoundException('Video Not Found');
    const editVideo = new this.videoModel(Object.assign(video, updateVideoDto)); // Replace ค่า แบบเอาไปแทนที่ ถ้าเกิดมีค่านั้นๆใน updateVideoDto
    return await editVideo.save();
  }

  // remove(id: string) {
  //   return `This action removes a #${id} video`;
  // }
}
