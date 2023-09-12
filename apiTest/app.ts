import express, { Request, Response } from 'express';
import axios from 'axios';
import { User } from './user';
const app = express();
const port = 3000;

app.use(express.json());

app.get('/', async (req: Request, res: Response) => {
    const departmentReport: Record<string, any> = {};
    try {
        const response = await axios.get('https://dummyjson.com/users');
        const data = response.data;

        data.users.forEach((user: User) => {
            const department = user.company.department;
            if (!departmentReport[department]) {
              departmentReport[department] = {
                male: 0,
                female: 0,
                ageRange: "",
                ageMode: 0,
                hair: {},
                addressUser: {}
              };
            }
          
            // นับเพศ
            if (user.gender === "male") {
              departmentReport[department].male++;
            } else if (user.gender === "female") {
              departmentReport[department].female++;
            }
          
            // คำนวณ Range อายุ
            // โค้ดคำนวณ Range อายุอาจจะยาว คุณต้องระบุเงื่อนไขเองตามที่คุณต้องการ
          
            // คำนวณ Mode อายุ
            // โค้ดคำนวณ Mode อายุอาจจะยาว คุณต้องระบุเงื่อนไขเองตามที่คุณต้องการ
          
            // นับสีผม
            const hairColor = user.hair.color;
            if (!departmentReport[department].hair[hairColor]) {
              departmentReport[department].hair[hairColor] = 0;
            }
            departmentReport[department].hair[hairColor]++;
          
            // เก็บข้อมูลที่อยู่
            const addressKey = `${user.firstName}${user.lastName}`;
            departmentReport[department].addressUser[addressKey] = user.address.postalCode;
          });
          
          const departmentArray = Object.keys(departmentReport).map((department) => ({
            [department]: departmentReport[department]
          }));
        res.json({ receivedData: departmentArray });
      } catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching data' });
      }
});

app.post('/api/data', (req: Request, res: Response) => {
  const data = req.body;
  res.json({ receivedData: data });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});