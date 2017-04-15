import {roles} from './constants';
// eslint-disable-next-line no-unused-vars
import {pfoho, quincy, leverett} from './houses';

let students = [];

const add = (firstName, lastName, house, year, concentration, sex, imageURL, bio) => {
  students.push({
    role: roles.student,
    firstName,
    lastName,
    house,
    year,
    concentration,
    sex,
    imageURL,
    bio,
  });
};


add(
  'Nick', 'Merrill',
  pfoho,
  '2018',
  'Computer Science',
  'M',
  'https://scontent.fzty2-1.fna.fbcdn.net/v/t1.0-9/417556_4604809077869_865814500_n.jpg?oh=096c4f3f2aa402cc5b7ded76d9606501&oe=59567461',
  'Nick is a senior studying computer science. He took two gap years to work on a startup. \n\n he/him/his'
);

add(
  'Channy', 'Hong',
  pfoho,
  '2019',
  'Economics',
  'M',
  'https://scontent.fzty2-1.fna.fbcdn.net/v/t1.0-9/10392253_1135704643120429_5541253428949532488_n.jpg?oh=f585a2149a16f781ce8418e65c1e6b3b&oe=59510C1C',
  'Channy likes to play Dota'
);

add(
  'Nebras', 'Jemel',
  pfoho,
  '2020',
  'Philosophy',
  'M',
'https://scontent.fzty2-1.fna.fbcdn.net/v/t1.0-1/15079033_10211581463516017_8272026401114106521_n.jpg?oh=adbde74a22790c659e145af0e7e26715&oe=598FA558',
  'Nebras likes to read Kant'
);

add(
  'Chris', 'Morrow',
  pfoho,
  '2020',
  'Applied Mathmatics',
  'M',
  'https://scontent.fzty2-1.fna.fbcdn.net/v/t1.0-9/12227170_1127771520588812_6267020617702920324_n.jpg?oh=d5a77593f4453cd7f2272ac8fc79f14d&oe=598F3D8C',
  'Chris likes to play Tennis'
);

add(
  'Hunter', 'Worland',
  pfoho,
  '2019',
  'Physics',
  'M',
  'https://scontent.fzty2-1.fna.fbcdn.net/v/t1.0-9/16266306_1238600729564901_3203678302104211947_n.jpg?oh=feb2cd3dc500e16f6cb7184a77ebc254&oe=597FFCFF',
  'Hunter likes to ski and travel around the world'
);

add(
  'Isabela', 'Vitta',
  pfoho,
  '2019',
  'Economics',
  'F',
  'https://scontent.fzty2-1.fna.fbcdn.net/v/t1.0-9/13680762_10207105491337107_309880865121545779_n.jpg?oh=7b52f6de190ef385e0d45320ce99df69&oe=5991EB2A',
  'Isabela is from Brazil'
);

add(
  'Sarah', 'Stevens',
  pfoho,
  '2019',
  'Visual and Environmental Studies',
  'F',
  'https://scontent.fzty2-1.fna.fbcdn.net/v/t1.0-9/14520509_1169716576410113_3218914329459535644_n.jpg?oh=70c9cb659b7289776409c5d6e69b7b1c&oe=5982D023',
  'Sarah likes comedy'
);

add(
  'Faith', 'Pak',
  pfoho,
  '2020',
  'English',
  'F',
  'https://scontent.fzty2-1.fna.fbcdn.net/v/t1.0-9/14495325_374457162886143_2644674093942240823_n.jpg?oh=f113e53326652ed462134796b996bf7a&oe=599554B8',
  'Faith enjoys drinking different types of wine'
);

add(
  'Alyn', 'Wallace',
  pfoho,
  '2020',
  'Studies of Woman, Gender, and Sexuality',
  'F',
  'https://scontent.fzty2-1.fna.fbcdn.net/v/t1.0-9/17904335_1602130003161093_4666719983075130483_n.jpg?oh=0ef093477dd62a623dc7a9e6419deaab&oe=59556622',
  'Faith likes to explore different types of light in the world'
);

add(
  'Bryan', 'Hu',
  leverett,
  '2020',
  'Engineering Sciences',
  'M',
  'http://leverett.harvard.edu/facebook/getface.php?leverettuid=4373',
  'Bryan likes to play drum'
);

add(
  'George', 'Goodwin',
  leverett,
  '2018',
  'Anthropology',
  'M',
  'http://leverett.harvard.edu/facebook/getface.php?leverettuid=3915',
  'George digs around at the yard to find about the past'
);

add(
  'Manny', 'Romero',
  leverett,
  '2019',
  'Neurobiology',
  'M',
  'http://leverett.harvard.edu/facebook/getface.php?leverettuid=4084',
  'Manny likes to know about your brain structure'
);

add(
  'Thomas', 'Peterson',
  leverett,
  '2017',
  'History and Literature',
  'M',
  'http://leverett.harvard.edu/facebook/getface.php?leverettuid=4206',
  'Thomas likes to dance!'
);

add(
  'Carlos', 'Mendizabal',
  leverett,
  '2018',
  'Computer Science',
  'M',
  'http://leverett.harvard.edu/facebook/getface.php?leverettuid=4189',
  'Carlos likes to row'
);

add(
  'Belle', 'Lee',
  leverett,
  '2018',
  'Classics',
  'F',
  'http://leverett.harvard.edu/facebook/getface.php?leverettuid=4173',
  'Belle loves to go see musicals'
);

add(
  'Eliza', 'Mantz',
  leverett,
  '2018',
  'Theater, Dance & Media',
  'F',
  'http://leverett.harvard.edu/facebook/getface.php?leverettuid=4182',
  'Eliza wants to work with Comedians!'
);

add(
  'Sarah', 'Chapin',
  leverett,
  '2017',
  'Enginering Sciences',
  'F',
  'http://leverett.harvard.edu/facebook/getface.php?leverettuid=3666',
  'Sarah likes to make robots during the weekends'
);

add(
  'Katherine', 'Balton',
  leverett,
  '2019',
  'History and Science',
  'F',
  'http://leverett.harvard.edu/facebook/getface.php?leverettuid=4092',
  'Katherine wants to work in Africa to help eradicating AIDS'
);

add(
  'Lara', 'Tang',
  leverett,
  '2018',
  'Human Evolutionary Biology',
  'F',
  'http://leverett.harvard.edu/facebook/getface.php?leverettuid=4227',
  'Lara is obssessed with recycling'
);




export default students;
