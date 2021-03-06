export type Role = 'admin' | 'member' | 'reviewer';

export type User = {
    id: number | string;
    name: string;
    member_since: string;
    last_active: string;
    score: number;
    annotated_count: number;
    role: Role;
    email: string;
    last_project_id?: number;
}

export const SampleUsers: User[] = [
    {
        "id": 1,
        "name": "Abhishek Sharma",
        "member_since": "2021-12-30T05:18:56.864Z",
        "last_active": "2021-12-30T05:18:56.864Z",
        "score": 0,
        "role": "admin",
        "email": "absharma9796@gmail.com",
        "last_project_id": 1,
        "annotated_count": 0,
    },
    {
        "id": 2,
        "name": "Happy Psyduck",
        "member_since": "2021-12-30T05:18:56.864Z",
        "last_active": "2021-12-30T05:18:56.864Z",
        "score": 0,
        "role": "member",
        "email": "",
        "last_project_id": 1,
        "annotated_count": 0,
    },
    {
        "id": 3,
        "name": "Happy Psyduck",
        "member_since": "2021-12-30T05:18:56.864Z",
        "last_active": "2021-12-30T05:18:56.864Z",
        "score": 0,
        "role": "member",
        "email": "",
        "last_project_id": 1,
        "annotated_count": 0,
    },
    {
        "id": 4,
        "name": "Happy Psyduck",
        "member_since": "2021-12-30T05:18:56.864Z",
        "last_active": "2021-12-30T05:18:56.864Z",
        "score": 0,
        "role": "member",
        "email": "",
        "last_project_id": 1,
        "annotated_count": 0,
    },
    {
        "id": 5,
        "name": "Happy Psyduck",
        "member_since": "2021-12-30T05:18:56.864Z",
        "last_active": "2021-12-30T05:18:56.864Z",
        "score": 0,
        "role": "member",
        "email": "",
        "last_project_id": 1,
        "annotated_count": 0,
    },
    {
        "id": 6,
        "name": "Happy Psyduck",
        "member_since": "2021-12-30T05:18:56.864Z",
        "last_active": "2021-12-30T05:18:56.864Z",
        "score": 0,
        "role": "member",
        "email": "",
        "last_project_id": 1,
        "annotated_count": 0,
    },
    {
        "id": 7,
        "name": "Happy Psyduck",
        "member_since": "2021-12-30T05:18:56.864Z",
        "last_active": "2021-12-30T05:18:56.864Z",
        "score": 0,
        "role": "member",
        "email": "",
        "last_project_id": 1,
        "annotated_count": 0,
    },
    {
        "id": 8,
        "name": "Happy Psyduck",
        "member_since": "2021-12-30T05:18:56.864Z",
        "last_active": "2021-12-30T05:18:56.864Z",
        "score": 0,
        "role": "member",
        "email": "",
        "last_project_id": 1,
        "annotated_count": 0,
    },
    {
        "id": 9,
        "name": "Happy Psyduck",
        "member_since": "2021-12-30T05:18:56.864Z",
        "last_active": "2021-12-30T05:18:56.864Z",
        "score": 0,
        "role": "member",
        "email": "",
        "last_project_id": 1,
        "annotated_count": 0,
    },
    {
        "id": 10,
        "name": "Happy Psyduck",
        "member_since": "2021-12-30T05:18:56.864Z",
        "last_active": "2021-12-30T05:18:56.864Z",
        "score": 0,
        "role": "member",
        "email": "",
        "last_project_id": 1,
        "annotated_count": 0,
    }
];

export const SampleEmailPassMap: {[email: string]: string} = {
    "absharma9796@gmail.com": "qwerty123",
    "admin@saiface.com": "qwerty1234",
    "psypsy@gmail.com": "qwerty1234",
    "iamreviewer@gmail.com": "qwerty1234",
    "iammember@gmail.com": "qwerty1234",
    "iamadmin@gmail.com": "qwerty1234"
}
  