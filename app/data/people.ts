export type Member = {
    name: string
    role?: string
    affiliation?: string
    bio?: string
    image?: string
    link?: string
}

export type Section = {
    title: string
    type: 'grid' | 'list'
    members: Member[]
}

export const peopleData: Section[] = [
    {
        title: "Team",
        type: "grid",
        members: [
            {
                name: "Mahmoud Abdelmoneum",
                role: "Researcher",
                affiliation: "Massachusetts Institute of Technology & Perseus Labs",
            },
            {
                name: "Pierfrancesco Beneventano",
                role: "Researcher",
                affiliation: "Massachusetts Institute of Technology",
                image: "/people/pier-285x300.jpg",
                link: "https://pierbeneventano.github.io",
            },
            {
                name: "Tomaso Poggio",
                role: "Principal Investigator",
                affiliation: "Massachusetts Institute of Technology",
                image: "/people/poggio-240x300.jpg",
                link: "https://poggio-lab.mit.edu",
            },
        ]
    },
]
