import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Req,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';
import { LoginDto } from './dto/signup-user.dto';
import { JwtGuard } from './guards/jwt/jwt.guard';
import {
  HandleValidateError,
  MongoExceptionFilter,
} from './error/handlers/handlers.filter';
import { Roles } from './decorators/role.decorator';
import { PremiumRoles } from './config/database.enum';
import { CryptoService } from './security/aes-hasher.help';

@Controller('users')
export class UserController {
  constructor(
    private userService: UserService,
    private hashAesAlgo: CryptoService,
  ) {}

  @UseGuards(JwtGuard)
  @Get('profiles/:id')
  @UseFilters(HandleValidateError, MongoExceptionFilter)
  // @Render('index')
  getUser(@Param('id') id: any): object {
    const data = this.userService.getUser(id);
    return data;
  }

  @UseGuards(JwtGuard)
  @Get('/profiles/')
  @Roles(PremiumRoles.premium)
  getAllUsers(@Req() req: any): Promise<string | object> {
    console.log(req.user);
    const data = this.userService.getUsers();
    return data;
  }

  @Post('/signup')
  @UseFilters(HandleValidateError, MongoExceptionFilter)
  async signUpUser(@Body() userInfo: CreateUserDto, @Req() req: any) {
    console.log(req.user);
    const signInInfo = await this.userService.createUser(userInfo, req);
    console.log(req.user);
    return signInInfo;
  }

  @Post('/login')
  @HttpCode(HttpStatus.OK)
  async loginUser(@Param() id: string, @Body() userInfo: LoginDto) {
    const result = await this.userService.loginUser(
      id,
      userInfo.password,
      new CryptoService(),
    );
    return result.info;
  }

  @Patch('profile/:id')
  patchUser(@Param('id') id: number, @Body() userInfo: CreateUserDto) {
    return this.userService.patchUser(id, userInfo);
  }

  @UseGuards(JwtGuard)
  @Delete('/:id/deactivateAccount')
  deleteUser(@Param('id') id: string) {
    return this.userService.deleteUser(id);
  }
}
