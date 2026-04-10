export type Person = {
  name: string;
  role?: string;
  affiliation?: string;
  image?: string;
  link?: string;
};

export const peopleData: Person[] = [
  {
    name: "Pierfrancesco Beneventano",
    //role: "CEO",
    affiliation: "MIT",
    image: "/people/pier-285x300.jpg",
    link: "https://pierbeneventano.github.io",
  },
  {
    name: "Tomer Galanti",
    //role: "CTO",
    affiliation: "Texas A&M University",
    image: "/people/tomer_galanti.png",
    link: "https://tomergalanti.github.io/"
  },
  {
    name: "Tomaso Poggio",
    //role: "Chairman",
    affiliation: "MIT",
    image: "/people/poggio-240x300.jpg",
    link: "https://poggio-lab.mit.edu",
  },
  
  //Founding Researchers
  {
    name: "Mahmoud Abdelmoneum",
    //role: "Founding Researcher",
    affiliation: "MIT & Perseus Labs",
        image: "/people/mahmoud_a.jpg",
  },
  {
    name: "Riccardo Neumarker",
    //role: "Founding Researcher",
    affiliation: "MIT",
    image: "/people/riccardo_n.jpeg",
    link: "https://riccardoneumarker.com",
  },
  {
    name: "Emanuele Rimoldi",
    //role: "Founding Researcher",
    affiliation: "MIT",
    image: "/people/emanuele_r.jpg",
    link: "https://www.emanuelerimoldi.com/",
  },
  
  
];
