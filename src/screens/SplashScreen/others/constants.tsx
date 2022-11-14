import { images } from "../../../common/images";

export interface IScreen { 
    id: number, 
    title: string,
    subTitle: string,
    images: Array<_SourceUri>
    first_btn_text: string,
    second_btn_text: string,
}

export const SCREENS: IScreen[] = [
    {
        id: 1,
        title: 'Welcome to the Planner',
        subTitle: 'All tasks, meetings and annual plans in the one place are always at hand',
        images: [
            images.spl_screen_img_1_earth, 
            images.spl_screen_img_1_people
        ], // img
        first_btn_text: 'Let`s get started', 
        second_btn_text: 'Skip',
    },
    {
        id: 2,
        title: 'Create task and plan',
        subTitle: 'Easy plan your time for the day, week, months and even years',
        images: [
            images.spl_screen_img_2, 
            images.spl_screen_img_2_lines
        ], // img
        first_btn_text: 'Continue', 
        second_btn_text: 'Skip',
    },
    {
        id: 3,
        title: 'How can we work together',
        subTitle: 'You create a task and we don\'t forget to remind you about it',
        images: [
            images.spl_screen_img_3_rocket,
            images.spl_screen_img_3_smallStars,
            images.spl_screen_img_3_bigStar, 
        ], // img
        first_btn_text: 'Get started', 
        second_btn_text: 'Skip',
    },
]
