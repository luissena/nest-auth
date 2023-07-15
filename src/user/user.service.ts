import { ConflictException, Injectable } from '@nestjs/common';
import { hash } from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';
import { JWTService } from 'src/utils/jwt/jwt.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JWTService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const userExists = await this.prisma.user.findFirst({
      where: {
        email: createUserDto.email,
      },
    });

    if (userExists) {
      throw new ConflictException('User already exists');
    }

    const newUser = await this.prisma.user.create({
      data: {
        email: createUserDto.email,
        name: createUserDto.name,
        password: await hash(createUserDto.password, 10),
      },
    });

    const token = await this.jwtService.generateToken(newUser);

    return {
      token,
    };
  }

  async findAll() {
    const users = await this.prisma.user.findMany();
    return users;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
