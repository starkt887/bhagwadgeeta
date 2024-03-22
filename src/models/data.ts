import { geetamodel } from "./geetamodel";
import { notificationModel } from "./notificationmodel";

//https://www.bhagavad-gita.org/
//https://github.com/gita
// export const geetadata: geetamodel[] = [
//     {
//         title: "aadhyay1",
//         shloks: [
//             {
//                 title: "hello",
//                 shlok: "this is the actual shlok data",
//                 description: "this is the description of the shlok which will be little in details"
//             },
//             {
//                 title: "hello",
//                 shlok: "this is the actual shlok data",
//                 description: "this is the description of the shlok which will be little in details"
//             },
//             {
//                 title: "hello",
//                 shlok: "this is the actual shlok data",
//                 description: "this is the description of the shlok which will be little in details"
//             },
//             {
//                 title: "hello",
//                 shlok: "this is the actual shlok data",
//                 description: "this is the description of the shlok which will be little in details"
//             },
//             {
//                 title: "hello",
//                 shlok: "this is the actual shlok data",
//                 description: "this is the description of the shlok which will be little in details"
//             },
//             {
//                 title: "hello",
//                 shlok: "this is the actual shlok data",
//                 description: "this is the description of the shlok which will be little in details"
//             }
//         ]
//     },
//     {
//         title: "aadhyay2",
//         shloks: [
//             {
//                 title: "hello2",
//                 shlok: "this is the actual shlok data",
//                 description: "this is the description of the shlok which will be little in details"
//             },
//             {
//                 title: "hello2",
//                 shlok: "this is the actual shlok data",
//                 description: "this is the description of the shlok which will be little in details"
//             },
//             {
//                 title: "hello2",
//                 shlok: "this is the actual shlok data",
//                 description: "this is the description of the shlok which will be little in details"
//             },
//             {
//                 title: "hello2",
//                 shlok: "this is the actual shlok data",
//                 description: "this is the description of the shlok which will be little in details"
//             },
//             {
//                 title: "hello2",
//                 shlok: "this is the actual shlok data",
//                 description: "this is the description of the shlok which will be little in details"
//             },
//             {
//                 title: "hello2",
//                 shlok: "this is the actual shlok data",
//                 description: "this is the description of the shlok which will be little in details"
//             }
//         ]
//     },
//     {
//         title: "aadhyay3",
//         shloks: [
//             {
//                 title: "hello3",
//                 shlok: "this is the actual shlok data",
//                 description: "this is the description of the shlok which will be little in details"
//             },
//             {
//                 title: "hello3",
//                 shlok: "this is the actual shlok data",
//                 description: "this is the description of the shlok which will be little in details"
//             },
//             {
//                 title: "hello3",
//                 shlok: "this is the actual shlok data",
//                 description: "this is the description of the shlok which will be little in details"
//             },
//             {
//                 title: "hello3",
//                 shlok: "this is the actual shlok data",
//                 description: "this is the description of the shlok which will be little in details"
//             },
//             {
//                 title: "hello3",
//                 shlok: "this is the actual shlok data",
//                 description: "this is the description of the shlok which will be little in details"
//             },
//             {
//                 title: "hello3",
//                 shlok: "this is the actual shlok data",
//                 description: "this is the description of the shlok which will be little in details"
//             }
//         ]
//     },
//     {
//         title: "aadhyay4",
//         shloks: [
//             {
//                 title: "hello4",
//                 shlok: "this is the actual shlok data",
//                 description: "this is the description of the shlok which will be little in details"
//             },
//             {
//                 title: "hello4",
//                 shlok: "this is the actual shlok data",
//                 description: "this is the description of the shlok which will be little in details"
//             },
//             {
//                 title: "hello4",
//                 shlok: "this is the actual shlok data",
//                 description: "this is the description of the shlok which will be little in details"
//             },
//             {
//                 title: "hello4",
//                 shlok: "this is the actual shlok data",
//                 description: "this is the description of the shlok which will be little in details"
//             },
//             {
//                 title: "hello4",
//                 shlok: "this is the actual shlok data",
//                 description: "this is the description of the shlok which will be little in details"
//             },
//             {
//                 title: "hello4",
//                 shlok: "this is the actual shlok data",
//                 description: "this is the description of the shlok which will be little in details"
//             }
//         ]
//     },
//     {
//         title: "aadhyay5",
//         shloks: [
//             {
//                 title: "hello5",
//                 shlok: "this is the actual shlok data",
//                 description: "this is the description of the shlok which will be little in details"
//             },
//             {
//                 title: "hello5",
//                 shlok: "this is the actual shlok data",
//                 description: "this is the description of the shlok which will be little in details"
//             },
//             {
//                 title: "hello5",
//                 shlok: "this is the actual shlok data",
//                 description: "this is the description of the shlok which will be little in details"
//             },
//             {
//                 title: "hello5",
//                 shlok: "this is the actual shlok data",
//                 description: "this is the description of the shlok which will be little in details"
//             },
//             {
//                 title: "hello5",
//                 shlok: "this is the actual shlok data",
//                 description: "this is the description of the shlok which will be little in details"
//             },
//             {
//                 title: "hello5",
//                 shlok: "this is the actual shlok data",
//                 description: "this is the description of the shlok which will be little in details"
//             }
//         ]
//     },
//     {
//         title: "aadhyay6",
//         shloks: [
//             {
//                 title: "hello6",
//                 shlok: "this is the actual shlok data",
//                 description: "this is the description of the shlok which will be little in details"
//             },
//             {
//                 title: "hello6",
//                 shlok: "this is the actual shlok data",
//                 description: "this is the description of the shlok which will be little in details"
//             },
//             {
//                 title: "hello6",
//                 shlok: "this is the actual shlok data",
//                 description: "this is the description of the shlok which will be little in details"
//             },
//             {
//                 title: "hello6",
//                 shlok: "this is the actual shlok data",
//                 description: "this is the description of the shlok which will be little in details"
//             },
//             {
//                 title: "hello6",
//                 shlok: "this is the actual shlok data",
//                 description: "this is the description of the shlok which will be little in details"
//             },
//             {
//                 title: "hello6",
//                 shlok: "this is the actual shlok data",
//                 description: "this is the description of the shlok which will be little in details"
//             }
//         ]
//     }
// ]

export const notifcationdata: notificationModel[] = [
    {
        id: 1,
        title: "title1",
        msg: "This is notifcation 1"
    },
    {
        id: 2,
        title: "title2",
        msg: "This is notifcation 2"
    },
    {
        id: 3,
        title: "title3",
        msg: "This is notifcation 3"
    },
    {
        id: 4,
        title: "title4",
        msg: "This is notifcation 4"
    },
    {
        id: 5,
        title: "title5",
        msg: "This is notifcation 5"
    },
    {
        id: 6,
        title: "title6",
        msg: "This is notifcation 6"
    }
]