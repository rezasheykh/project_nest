import { EventTypes } from 'src/event/entities/event.entity';
import { PaginationDto } from './dto/pagination.dto';
import { CreatePostDto } from './dtos/create-post.dto';
import { UpdatePostDto } from './dtos/update-post.dto';
import { PostService } from './post.service';
export declare class PostController {
    private readonly postService;
    constructor(postService: PostService);
    findAll(): Promise<import("./entities/post.entity").PostEntity[]>;
    findAllPaginated(query: PaginationDto): Promise<import("./entities/post.entity").PostEntity[]>;
    findOne(id: any): Promise<import("./entities/post.entity").PostEntity>;
    insert(body: CreatePostDto): Promise<import("./entities/post.entity").PostEntity>;
    update(id: any, body: UpdatePostDto): Promise<import("./entities/post.entity").PostEntity>;
    patch(id: any, body: UpdatePostDto): Promise<import("./entities/post.entity").PostEntity>;
    like(id: any, userId: any, type: EventTypes): Promise<import("./entities/post.entity").PostEntity | import("@nestjs/common").BadRequestException>;
    delete(id: any): Promise<import("./entities/post.entity").PostEntity>;
}
