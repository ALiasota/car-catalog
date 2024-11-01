import { CarService } from './carService'
import { CategoryService } from './categoryService'

const categories = [
    {
        name: 'Vehicles',
        description: 'Vehicles',
        image: 'https://promova.com/content/types_of_vehicles_9a57ec3d6b.png',
    },
    {
        name: 'SUV',
        description: 'Sport Utility Vehicle',
        image: 'https://media.licdn.com/dms/image/v2/D4D12AQGaxGhaGbRexQ/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1684355204332?e=2147483647&v=beta&t=mHOra_0123RxGexTkJgGwClCAYXvE7ToGuY0LTmMYUU',
        parent: 'Vehicles',
    },
    {
        name: 'Sedan',
        description: 'Compact car',
        image: 'https://northfleet.in/wp-content/uploads/2024/01/sedan-vs-suv.webp',
        parent: 'Vehicles',
    },
    {
        name: 'Truck',
        description: 'Heavy-duty vehicle',
        image: 'https://www.daimlertruck.com/fileadmin/_processed_/3/d/csm_Motiv2_240327_2_LoRes_ce401c992c.webp',
        parent: 'Vehicles',
    },
]

const cars = [
    {
        name: 'Toyota RAV4',
        price: 30000,
        color: 'Black',
        description: 'Reliable SUV',
        image: 'https://scene7.toyota.eu/is/image/toyotaeurope/DSC_0122-min?wid=1280&fit=fit,1&ts=0&resMode=sharp2&op_usm=1.75,0.3,2,0',
        categoryName: 'SUV',
    },
    {
        name: 'Honda Civic',
        price: 20000,
        color: 'Red',
        description: 'Compact car',
        image: 'https://upload.wikimedia.org/wikipedia/commons/2/23/2022_Honda_Civic_LX_Sedan%2C_front_right%2C_11-02-2022.jpg',
        categoryName: 'Sedan',
    },
    {
        name: 'Ford F-150',
        price: 35000,
        color: 'Blue',
        description: 'Tough truck for work and play',
        image: 'https://nextcar.ua/images/companies/1/volkswagen_tiguan_l_pro/F-150-Lightning-Flash-1.jpg?1713176710088',
        categoryName: 'Truck',
    },
]

export class SeedService {
    static async insertTestCategories() {
        const count = await CategoryService.getCategoryCount()

        if (!count) await CategoryService.insertCategories(categories)
    }

    static async insertTestCars() {
        const count = await CarService.getCarCount()

        if (!count) await CarService.insetCars(cars)
    }
}
