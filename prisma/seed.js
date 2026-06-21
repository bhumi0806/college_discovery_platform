const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const colleges = [
  {
    name: 'Skyline Institute of Technology',
    location: 'Mumbai, Maharashtra',
    fees: 780000,
    rating: 4.7,
    overview: 'Skyline Institute is known for strong engineering and placement support with global recruiters.',
    placements: '85% placement rate, top packages from TCS, Cognizant, Accenture.',
    courses: ['Computer Science', 'Electronics', 'Civil Engineering'],
    reviews: [
      { author: 'Priya', rating: 5, content: 'Excellent campus and faculty.' },
      { author: 'Aakash', rating: 4, content: 'Great placement support and modern labs.' }
    ]
  },
  {
    name: 'Green Valley College',
    location: 'Bengaluru, Karnataka',
    fees: 620000,
    rating: 4.4,
    overview: 'Green Valley offers a balanced mix of academics and industry exposure in a vibrant campus.',
    placements: '75% placement rate with internships at startups and product firms.',
    courses: ['Data Science', 'MBA', 'Information Technology'],
    reviews: [
      { author: 'Neha', rating: 4, content: 'Good campus life and helpful mentors.' },
      { author: 'Rajat', rating: 5, content: 'The industry projects are the best part.' }
    ]
  },
  {
    name: 'Riverfront University',
    location: 'Pune, Maharashtra',
    fees: 690000,
    rating: 4.6,
    overview: 'Riverfront University focuses on research-driven programs and strong placement networks.',
    placements: '88% placement rate with top recruiters like Infosys and Wipro.',
    courses: ['Mechanical Engineering', 'AI & ML', 'Business Analytics'],
    reviews: [
      { author: 'Sneha', rating: 5, content: 'Amazing labs and good placement opportunities.' }
    ]
  },
  {
    name: 'Summit College of Engineering',
    location: 'Hyderabad, Telangana',
    fees: 710000,
    rating: 4.5,
    overview: 'Summit College combines strong academics with entrepreneurship mentoring.',
    placements: '80% placement rate; many students placed in product companies.',
    courses: ['Computer Science', 'Electronics', 'MBA'],
    reviews: [
      { author: 'Kavya', rating: 4, content: 'Helpful faculty and supportive student community.' }
    ]
  },
  {
    name: 'Crestview Institute',
    location: 'Chennai, Tamil Nadu',
    fees: 630000,
    rating: 4.2,
    overview: 'Crestview is well-regarded for practical learning and regional corporate connections.',
    placements: '70% placements with strong local industry ties.',
    courses: ['Civil Engineering', 'MBA', 'Computer Science'],
    reviews: [
      { author: 'Manish', rating: 4, content: 'Good exposure to real engineering projects.' }
    ]
  },
  {
    name: 'Lakeshore Business School',
    location: 'Kolkata, West Bengal',
    fees: 540000,
    rating: 4.1,
    overview: 'Lakeshore offers strong business programs and placement preparation support.',
    placements: '65% placement rate with roles in finance and consulting.',
    courses: ['MBA', 'Finance', 'Marketing'],
    reviews: [
      { author: 'Sonia', rating: 4, content: 'Good alumni network and career guidance.' }
    ]
  },
  {
    name: 'North Star University',
    location: 'Delhi, Delhi',
    fees: 850000,
    rating: 4.8,
    overview: 'North Star is a premium university with strong research and corporate partnerships.',
    placements: '90% placements with multinational recruiters.',
    courses: ['Computer Science', 'MBA', 'Law'],
    reviews: [
      { author: 'Karan', rating: 5, content: 'Excellent opportunities and global exposure.' }
    ]
  },
  {
    name: 'Horizon College of Design',
    location: 'Ahmedabad, Gujarat',
    fees: 520000,
    rating: 4.0,
    overview: 'Horizon trains designers for digital, product, and fashion industries.',
    placements: '68% placement rate with design studios and agencies.',
    courses: ['Graphic Design', 'Product Design', 'UX/UI Design'],
    reviews: [
      { author: 'Meera', rating: 4, content: 'Creative environment and industry internships.' }
    ]
  },
  {
    name: 'Eastbrook Institute',
    location: 'Kochi, Kerala',
    fees: 580000,
    rating: 4.3,
    overview: 'Eastbrook offers strong engineering and hospitality programs near the coast.',
    placements: '73% placement rate with hospitality and technology recruiters.',
    courses: ['Hospitality', 'Computer Science', 'Mechanical Engineering'],
    reviews: [
      { author: 'Anjali', rating: 4, content: 'Friendly campus and practical training.' }
    ]
  },
  {
    name: 'Aurora College',
    location: 'Jaipur, Rajasthan',
    fees: 620000,
    rating: 4.2,
    overview: 'Aurora provides balanced undergraduate programs with placement coaching.',
    placements: '72% placements with service sector roles.',
    courses: ['Computer Science', 'Business', 'Design'],
    reviews: [
      { author: 'Deepak', rating: 4, content: 'Good campus culture and supportive staff.' }
    ]
  },
  {
    name: 'Pinnacle Institute of Arts',
    location: 'Bhopal, Madhya Pradesh',
    fees: 460000,
    rating: 3.9,
    overview: 'Pinnacle is known for arts and social science programs with immersive projects.',
    placements: '60% placement rate in media and NGO roles.',
    courses: ['Communications', 'Psychology', 'Fine Arts'],
    reviews: [
      { author: 'Riya', rating: 4, content: 'Great support for creative students.' }
    ]
  },
  {
    name: 'Crown College',
    location: 'Surat, Gujarat',
    fees: 500000,
    rating: 4.1,
    overview: 'Crown College offers strong commerce and IT courses with vocational training.',
    placements: '66% placements in finance and software support roles.',
    courses: ['Commerce', 'Software Engineering', 'BBA'],
    reviews: [
      { author: 'Amit', rating: 4, content: 'Good for practical learning and internships.' }
    ]
  },
  {
    name: 'Alpine Technology Institute',
    location: 'Dehradun, Uttarakhand',
    fees: 640000,
    rating: 4.5,
    overview: 'Alpine offers engineering programs in a scenic campus with strong placements.',
    placements: '82% placement rate with recruiters like HCL and Bosch.',
    courses: ['Computer Science', 'Civil Engineering', 'Electrical Engineering'],
    reviews: [
      { author: 'Sahil', rating: 5, content: 'Campus environment is peaceful and motivating.' }
    ]
  },
  {
    name: 'Metro College',
    location: 'Noida, Uttar Pradesh',
    fees: 700000,
    rating: 4.6,
    overview: 'Metro College provides modern tech programs with strong placement support.',
    placements: '84% placements in product and consulting firms.',
    courses: ['Computer Science', 'MBA', 'Data Analytics'],
    reviews: [
      { author: 'Sneha', rating: 5, content: 'Excellent professional development programs.' }
    ]
  },
  {
    name: 'Mercury Institute',
    location: 'Nagpur, Maharashtra',
    fees: 480000,
    rating: 4.0,
    overview: 'Mercury supports students with affordable education and practical skill-building.',
    placements: '68% placement rate with local employers.',
    courses: ['Information Technology', 'Biotechnology', 'Commerce'],
    reviews: [
      { author: 'Rahul', rating: 4, content: 'Good value for money and supportive faculty.' }
    ]
  },
  {
    name: 'Silicon Heights University',
    location: 'Bengaluru, Karnataka',
    fees: 920000,
    rating: 4.9,
    overview: 'Silicon Heights is a premier tech university with exceptional placement outcomes.',
    placements: '95% placement rate with top product companies and startups.',
    courses: ['Computer Science', 'AI & ML', 'Cybersecurity'],
    reviews: [
      { author: 'Rahul', rating: 5, content: 'Unmatched tech exposure and mentor support.' }
    ]
  },
  {
    name: 'Golden Gate Institute',
    location: 'Gurgaon, Haryana',
    fees: 840000,
    rating: 4.7,
    overview: 'Golden Gate provides corporate ready programs with strong internship pipelines.',
    placements: '89% placement rate with consulting and IT roles.',
    courses: ['Business Analytics', 'Finance', 'Marketing'],
    reviews: [
      { author: 'Tanya', rating: 5, content: 'The placement team is highly responsive.' }
    ]
  },
  {
    name: 'Orchid Engineering College',
    location: 'Mysore, Karnataka',
    fees: 540000,
    rating: 4.2,
    overview: 'Orchid College emphasizes hands-on engineering programs in a quiet campus.',
    placements: '74% placements in engineering services and R&D firms.',
    courses: ['Mechanical Engineering', 'Computer Science', 'Civil Engineering'],
    reviews: [
      { author: 'Nidhi', rating: 4, content: 'Strong technical labs and supportive faculty.' }
    ]
  },
  {
    name: 'Royal Business Academy',
    location: 'Pune, Maharashtra',
    fees: 680000,
    rating: 4.5,
    overview: 'Royal Business Academy delivers business education with strong alumni mentorship.',
    placements: '81% placements in finance, consulting, and e-commerce roles.',
    courses: ['MBA', 'Finance', 'Entrepreneurship'],
    reviews: [
      { author: 'Ayesha', rating: 5, content: 'Good mentorship and industry-ready training.' }
    ]
  },
  {
    name: 'Vista College',
    location: 'Lucknow, Uttar Pradesh',
    fees: 530000,
    rating: 4.0,
    overview: 'Vista College offers affordable programs with growing placement support.',
    placements: '69% placement rate with regional recruiters.',
    courses: ['Commerce', 'Information Technology', 'Management'],
    reviews: [
      { author: 'Rohit', rating: 4, content: 'Good student clubs and practical workshops.' }
    ]
  },
  {
    name: 'Atlas Institute',
    location: 'Indore, Madhya Pradesh',
    fees: 560000,
    rating: 4.1,
    overview: 'Atlas Institute combines traditional courses with modern technology modules.',
    placements: '70% placements in IT and manufacturing sectors.',
    courses: ['Computer Science', 'Electrical Engineering', 'MBA'],
    reviews: [
      { author: 'Pooja', rating: 4, content: 'Good campus and growing placement support.' }
    ]
  },
  {
    name: 'Zenith Technical Campus',
    location: 'Raipur, Chhattisgarh',
    fees: 490000,
    rating: 3.8,
    overview: 'Zenith provides access to technical education with solid local industry ties.',
    placements: '63% placement rate with regional employers.',
    courses: ['Mechanical Engineering', 'Civil Engineering', 'Computer Science'],
    reviews: [
      { author: 'Vikram', rating: 4, content: 'Strong foundations and affordable fees.' }
    ]
  },
  {
    name: 'Oceanview University',
    location: 'Visakhapatnam, Andhra Pradesh',
    fees: 610000,
    rating: 4.3,
    overview: 'Oceanview University offers coastal campus life with dedicated placement coaching.',
    placements: '76% placements in software and maritime roles.',
    courses: ['Marine Engineering', 'Computer Science', 'Business Analytics'],
    reviews: [
      { author: 'Suresh', rating: 4, content: 'Good campus and placement training.' }
    ]
  },
  {
    name: 'Sapphire Institute',
    location: 'Coimbatore, Tamil Nadu',
    fees: 600000,
    rating: 4.4,
    overview: 'Sapphire focuses on practical engineering education with strong industry connections.',
    placements: '78% placement rate with national recruiters.',
    courses: ['Civil Engineering', 'Computer Science', 'Electronics'],
    reviews: [
      { author: 'Divya', rating: 5, content: 'Very supportive placement office and modern curriculum.' }
    ]
  },
  {
    name: 'Evergreen College',
    location: 'Patna, Bihar',
    fees: 470000,
    rating: 3.9,
    overview: 'Evergreen College offers affordable campus programs and a supportive community.',
    placements: '62% placements in education and local services.',
    courses: ['Commerce', 'Biotechnology', 'Computer Science'],
    reviews: [
      { author: 'Ankit', rating: 4, content: 'Friendly faculty and good community programs.' }
    ]
  },
  {
    name: 'Prestige Institute',
    location: 'Guwahati, Assam',
    fees: 550000,
    rating: 4.1,
    overview: 'Prestige Institute blends academic rigor with placement mentoring.' ,
    placements: '71% placement rate with regional and national employers.',
    courses: ['Computer Science', 'Civil Engineering', 'Management'],
    reviews: [
      { author: 'Meghna', rating: 4, content: 'Good industry exposure and supportive faculty.' }
    ]
  },
  {
    name: 'Crown Heights University',
    location: 'Thiruvananthapuram, Kerala',
    fees: 640000,
    rating: 4.4,
    overview: 'Crown Heights offers technology and management programs in a lush campus.',
    placements: '79% placements with IT and healthcare firms.',
    courses: ['Computer Science', 'MBA', 'Health Sciences'],
    reviews: [
      { author: 'Leena', rating: 4, content: 'A calm campus and quality faculty.' }
    ]
  },
  {
    name: 'Praxis Institute',
    location: 'Surat, Gujarat',
    fees: 530000,
    rating: 4.0,
    overview: 'Praxis Institute prioritizes applied learning and industry internships.',
    placements: '70% placement rate with service sector recruiters.',
    courses: ['Information Technology', 'Business', 'Design'],
    reviews: [
      { author: 'Rohini', rating: 4, content: 'Good practical skills training.' }
    ]
  },
  {
    name: 'Royal Heritage College',
    location: 'Agra, Uttar Pradesh',
    fees: 510000,
    rating: 3.9,
    overview: 'Royal Heritage offers humanities and commerce programs with mentorship.' ,
    placements: '64% placement rate in government and nonprofit roles.',
    courses: ['History', 'Commerce', 'English Literature'],
    reviews: [
      { author: 'Vikas', rating: 4, content: 'Great for arts and social sciences.' }
    ]
  },
  {
    name: 'Apex Tech University',
    location: 'Bengaluru, Karnataka',
    fees: 900000,
    rating: 4.8,
    overview: 'Apex Tech is a top-tier technology university with excellent placement records.',
    placements: '93% placement rate with top tech and SaaS employers.',
    courses: ['AI & ML', 'Cloud Computing', 'Software Engineering'],
    reviews: [
      { author: 'Isha', rating: 5, content: 'Amazing mentorship and real work exposure.' }
    ]
  }
]

async function main() {
  console.log('Seeding colleges...')
  await prisma.review.deleteMany()
  await prisma.bookmark.deleteMany()
  await prisma.college.deleteMany()
  await prisma.user.deleteMany()

  for (const college of colleges) {
    await prisma.college.create({
      data: {
        name: college.name,
        location: college.location,
        fees: college.fees,
        rating: college.rating,
        overview: college.overview,
        placements: college.placements,
        courses: college.courses,
        reviews: {
          create: college.reviews
        }
      }
    })
  }

  console.log('Seed complete')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
