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
    let video = {
      ...createVideoDto,
      createdBy: admin,
      createDate: new Date(),
    };

    const newVideo = new this.videoModel(video);
    return await newVideo.save();
  }

  async countAllVideo() {
    return await this.videoModel.count({});
  }

  async findById(id: string): Promise<Video> {
    let query = { _id: id };
    return await this.videoModel.findOne(query);
  }

  async findWithPaginate(
    field: string,
    pageSize: number,
    pageNum: number,
    idKeySearch,
    videoKeySearch,
    publicSearch,
    focusedSearch,
    timeSort,
    burnSort,
    equipmentSearch,
  ): Promise<Video[]> {
    let queryList = [];

    if (idKeySearch) queryList.push({ _id: idKeySearch });
    if (videoKeySearch)
      queryList.push({
        $or: [
          { 'videoName.th': { $regex: videoKeySearch } },
          { 'videoName.en': { $regex: videoKeySearch } },
        ],
      });
    if (publicSearch) queryList.push({ public: publicSearch });
    if (focusedSearch) queryList.push({ focused: { $in: focusedSearch } });
    if (equipmentSearch) queryList.push({ equipment: { $in: focusedSearch } });

    let query = {};
    if (queryList.length > 1) query = { $and: queryList };
    else if (queryList.length == 1) query = queryList[0];

    let projection = {};
    if (field) {
      field.split(',').forEach((eachField) => {
        projection[eachField] = 1;
      });
    }

    let sortList: any = {};
    if (burnSort == 'asc') sortList.burn = 1;
    else if (burnSort == 'desc') sortList.burn = -1;
    if (timeSort == 'asc') sortList.videoTime = 1;
    else if (timeSort == 'desc') sortList.videoTime = -1;

    let option: any = { skip: (pageNum - 1) * pageSize, limit: pageSize };
    if (sortList != {}) option.sort = sortList;

    return await this.videoModel.find(query, projection, option);
  }

  async update(id: string, updateVideoDto: UpdateVideoDto) {
    const video = await this.findById(id); // ใช้ Funtion ร่วมกับในตัวมันเองได้เลย, มีการ throw ได้ตามปกติ
    if (!video) throw new NotFoundException('Video Not Found');
    const editVideo = new this.videoModel(Object.assign(video, updateVideoDto)); // Replace ค่า แบบเอาไปแทนที่ ถ้าเกิดมีค่านั้นๆใน updateVideoDto
    return await editVideo.save();
  }

  async delete(id: string) {
    let query = { _id: id };
    return await this.videoModel.deleteOne(query);
  }

  // remove(id: string) {
  //   return `This action removes a #${id} video`;
  // }
}
