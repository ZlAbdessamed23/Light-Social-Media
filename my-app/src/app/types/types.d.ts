export type LoginUser = {
    password: string;
    email: string;
};

export type RegisterUser = {
    name: string;
    email: string;
    password: string;
};


export type Post = {
    _id? : string;
    userId : string;
    title : string;
    description : string;
    createdAt : Date;
};

export type CreatePost = {
    title : string;
    description : string;
};

export type PostProps = {
    props : Post;
};

export type Message = {
    id? : string;
    senderId : string;
    receiverId : string;
    text : string;
    createdAt : string;
};

export type MessageProps = {
    props : Message;
};

export type User = {
    _id : string;
    name: string;
};

export type UserProps = {
    props : User;
};