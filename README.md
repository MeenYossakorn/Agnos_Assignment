# Agnos Hospital Patient Management System

---

## English

### Overview
This is a **hospital patient management system** application that allows patients to fill out medical forms and enables staff to monitor patient activities in real-time. Built with modern web technologies including Next.js, React, and Socket.IO for real-time communication.

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

### Tech Stack
- **Frontend:** Next.js 16, React 19, TypeScript, Tailwind CSS
- **Backend:** Express.js + Socket.IO (WebSocket)
- **Real-time Communication:** Socket.IO for instant updates
- **Languages:** Thai & English (Multi-language support)

### Main Features

#### Patient Page (`/patient_page`)
- Patient registration and medical information form
- **Form Fields:**
  - Personal Information (First Name, Middle Name, Last Name, Date of Birth, Gender)
  - Contact Information (Phone, Email, Address)
  - Additional Details (Nationality, Religion, Language)
  - Emergency Contact Information
- Multi-step form (step-by-step progress)
- Real-time status updates to staff dashboard

#### Staff Page (`/staff_page`)
- Monitor all active patients
- **Real-time Features:**
  - Active Status: View connected patients
  - Typing Status: See which patients are actively filling the form
  - Info Status: View submitted patient information
  - Step Progress: Track which form step patients are on

### Backend Socket.IO Events
Server runs on **Port 4000** and handles real-time communication:

- `patient-active` → Patient connects to system
- `new-patient` → Patient submits form data
- `patient-typing` → Patient starts typing
- `patient-stop-typing` → Patient stops typing
- `patient-step` → Patient advances to next form step
- `disconnect` → Patient disconnects

### Project Structure
```
├── app/
│   ├── patient_page/          → Patient form page
│   ├── staff_page/            → Staff monitoring page
│   └── layout.tsx             → Main layout
├── backend/
│   └── server.js              → Express + Socket.IO server
├── frontend/
│   ├── components/            → React components
│   │   ├── PatientPage.tsx    → Patient form component
│   │   ├── Staff.tsx          → Staff view component
│   │   ├── LanguageSwitcher.tsx → Language toggle
│   │   └── Navbar.tsx         → Navigation bar
│   └── lib/
│       └── socket.ts          → Socket.IO client config
├── context/
│   └── LanguageContext.tsx    → Language state management
├── public/                    → Static files
└── tsconfig.json              → TypeScript configuration
```

### Getting Started

#### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

#### Installation & Setup

1. **Clone the repository:**
```bash
git clone https://github.com/MeenYossakorn/Agnos_Assignment.git
cd agnos_assignment
```

2. **Install dependencies:**
```bash
npm install
```

3. **Start the backend server** (in a separate terminal):
```bash
cd backend
node server.js
```
The server will run on `http://localhost:4000`

4. **Start the development server:**
```bash
npm run dev
```

5. **Open your browser:**
patient_page : [http://localhost:3000/patient_page]
staff_page : [http://localhost:staff_page]

### Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm start        # Run production build
npm run lint     # Run ESLint
```

### Learn More

To learn more about the technologies used:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API
- [React Documentation](https://react.dev) - learn about React
- [Socket.IO Documentation](https://socket.io/docs) - learn about real-time communication
- [Tailwind CSS](https://tailwindcss.com/docs) - styling framework

### License
ISC License - See LICENSE file for details

---

## ไทย

### ภาพรวม
นี่คือแอปพลิเคชัน **ระบบจัดการข้อมูลผู้ป่วยโรงพยาบาล** ที่ช่วยให้ผู้ป่วยกรอกข้อมูลทางการแพทย์และเจ้าหน้าที่สามารถตรวจสอบกิจกรรมของผู้ป่วยแบบเรียลไทม์ (Real-time) โดยใช้ Next.js, React และ Socket.IO สำหรับการสื่อสารแบบเรียลไทม์

### Tech Stack
- **Frontend:** Next.js 16, React 19, TypeScript, Tailwind CSS
- **Backend:** Express.js + Socket.IO (WebSocket)
- **การสื่อสารแบบเรียลไทม์:** Socket.IO สำหรับการอัปเดตแบบสด
- **ภาษา:** ไทย & อังกฤษ (รองรับหลายภาษา)

### ฟีเจอร์หลัก

#### หน้าผู้ป่วย (`/patient_page`)
- แบบฟร้อมลงทะเบียนผู้ป่วยและข้อมูลทางการแพทย์
- **ช่องข้อมูลในฟร้อม:**
  - ข้อมูลส่วนตัว (ชื่อ, ชื่อกลาง, นามสกุล, วันเกิด, เพศ)
  - ข้อมูลติดต่อ (เบอร์โทร, อีเมล, ที่อยู่)
  - ข้อมูลเพิ่มเติม (สัญชาติ, ศาสนา, ภาษา)
  - ข้อมูลผู้ติดต่อฉุกเฉิน
- แบบฟร้อมแบบหลายขั้นตอน (ทำทีละขั้นตอน)
- การอัปเดตสถานะแบบเรียลไทม์ไปยังแดชบอร์ดเจ้าหน้าที่

#### หน้าเจ้าหน้าที่ (`/staff_page`)
- ตรวจสอบผู้ป่วยทั้งหมดที่เชื่อมต่อ
- **ฟีเจอร์เรียลไทม์:**
  - สถานะผู้ใช้งาน: ดูรายการผู้ป่วยที่เชื่อมต่ออยู่
  - สถานะการพิมพ์: เฝึงว่าใครกำลังกรอกฟร้อม
  - สถานะข้อมูล: ดูข้อมูลผู้ป่วยที่ส่งแล้ว
  - ความคืบหน้า: ติดตามว่าผู้ป่วยอยู่ขั้นตอนไหน

### Socket.IO Events ของ Backend
Server ทำงานบน **Port 4000** และจัดการการสื่อสารแบบเรียลไทม์:

- `patient-active` → ผู้ป่วยเชื่อมต่อเข้าสู่ระบบ
- `new-patient` → ผู้ป่วยส่งข้อมูลฟร้อม
- `patient-typing` → ผู้ป่วยกำลังพิมพ์
- `patient-stop-typing` → ผู้ป่วยหยุดพิมพ์
- `patient-step` → ผู้ป่วยไปยังขั้นตอนถัดไป
- `disconnect` → ผู้ป่วยตัดการเชื่อมต่อ

### โครงสร้างโปรเจค
```
├── app/
│   ├── patient_page/          → หน้าฟร้อมผู้ป่วย
│   ├── staff_page/            → หน้าตรวจสอบเจ้าหน้าที่
│   └── layout.tsx             → เลย์เอาต์หลัก
├── backend/
│   └── server.js              → Express + Socket.IO server
├── frontend/
│   ├── components/            → React components
│   │   ├── PatientPage.tsx    → component ฟร้อมผู้ป่วย
│   │   ├── Staff.tsx          → component มุมมองเจ้าหน้าที่
│   │   ├── LanguageSwitcher.tsx → ปุ่มเปลี่ยนภาษา
│   │   └── Navbar.tsx         → แถบนำทาง
│   └── lib/
│       └── socket.ts          → Socket.IO client config
├── context/
│   └── LanguageContext.tsx    → จัดการสถานะภาษา
├── public/                    → ไฟล์สถิต
└── tsconfig.json              → TypeScript configuration
```

### การเริ่มต้นใช้งาน

#### ข้อกำหนดเบื้องต้น
- Node.js 18+ ติดตั้งแล้ว
- npm หรือ yarn package manager

#### ติดตั้งและตั้งค่า

1. **โคลนพื้นที่เก็บข้อมูล:**
```bash
git clone https://github.com/MeenYossakorn/Agnos_Assignment.git
cd agnos_assignment
```

2. **ติดตั้ง dependencies:**
```bash
npm install
```

3. **เริ่มต้น backend server** (ในเทอร์มินัลแยกต่างหาก):
```bash
cd backend
node server.js
```
Server จะทำงานบน `http://localhost:4000`

4. **เริ่มต้น development server:**
```bash
npm run dev
```

5. **เปิดเบราว์เซอร์ของคุณ:**
ไปที่ 
patient_page : [http://localhost:3000/patient_page]
staff_page : [http://localhost:staff_page]

### Scripts ที่มีให้ใช้งาน

```bash
npm run dev      # เริ่ม development server
npm run build    # สร้าง production build
npm start        # รัน production build
npm run lint     # รัน ESLint
```

### เรียนรู้เพิ่มเติม

เพื่อเรียนรู้เพิ่มเติมเกี่ยวกับเทคโนโลยีที่ใช้:

- [Next.js Documentation](https://nextjs.org/docs) - เรียนรู้เกี่ยวกับคุณสมบัติและ API ของ Next.js
- [React Documentation](https://react.dev) - เรียนรู้เกี่ยวกับ React
- [Socket.IO Documentation](https://socket.io/docs) - เรียนรู้เกี่ยวกับการสื่อสารแบบเรียลไทม์
- [Tailwind CSS](https://tailwindcss.com/docs) - กรอบการทำงาน styling

### ใบอนุญาต
ISC License - ดูไฟล์ LICENSE สำหรับรายละเอียด
