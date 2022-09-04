import { Injectable } from '@nestjs/common';
import { File } from './entities/file.entity';
import { CreateFileDto } from './dto/create-file.dto';
import { UpdateFileDto } from './dto/update-file.dto';
import {
  InjectConnection,
  InjectEntityManager,
  InjectRepository,
} from '@nestjs/typeorm';
import { DataSource, EntityManager, Repository } from 'typeorm';
import { FilesChain } from './entities/file-chain.entity';

@Injectable()
export class FilesService {
  constructor(
    @InjectRepository(File) private readonly filesRepo: Repository<File>,
    // @InjectRepository(FilesChain)
    // private readonly filesChainRepo: Repository<FilesChain>,
    // @InjectConnection('chain')
    // private dataSource: DataSource,
    @InjectEntityManager('chain')
    private entityManager: EntityManager,
  ) {}

  async upload(file: Express.Multer.File) {
    console.log(file);
    const fileObj = await this.filesRepo
      .create({
        name: file.originalname,
        path: file.path,
        hash: '???',
      })
      .save();
    await this.entityManager.connection
      .getRepository(FilesChain)
      .create({
        name: file.originalname,
        path: file.path,
        hash: '???',
      })
      .save();

    return { isOk: true };
  }

  create(createFileDto: CreateFileDto) {
    return 'This action adds a new file';
  }

  findAll() {
    return `This action returns all files`;
  }

  findOne(id: number) {
    return `This action returns a #${id} file`;
  }

  update(id: number, updateFileDto: UpdateFileDto) {
    return `This action updates a #${id} file`;
  }

  remove(id: number) {
    return `This action removes a #${id} file`;
  }
}
