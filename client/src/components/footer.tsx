const footerLinks = [
    {
        title: "Categories",
        links: [
            "Programming",
            "Data Science",
            "Designing",
            "Networking",
            "Management",
            "Marketing",
            "Cybersecurity",
        ],
    },
    {
        title: "Locations",
        links: [
            "Bangalore",
            "Washington",
            "Hyderabad",
            "Mumbai",
            "California",
            "Chennai",
            "New York"
        ],
    }
];

export default function Footer() {
    return (
        <footer className="bg-white border-t shadow mt-10 px-6 py-10">
            <div className="w-full flex flex-col md:flex-row justify-between items-start gap-8">
                <div className="flex-1">
                    <div className="text-4xl font-bold mb-3">Job Searcher</div>
                    <p className="text-sm text-gray-600">
                        Find your dream job from top companies around the globe.
                    </p>
                </div>

                <div className="flex flex-wrap gap-10">
                    {footerLinks.map((section) => (
                        <div key={section.title}>
                            <h3 className="text-lg font-semibold mb-2">{section.title}</h3>
                            <ul className="space-y-1 text-gray-700 text-sm">
                                {section.links.map((link) => (
                                    <li key={link}>
                                        <a href="#" className="hover:underline">
                                            {link}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>

            <div className="mt-8 text-center text-gray-500 text-sm">
                © {new Date().getFullYear()} Job Searcher. All rights reserved.
            </div>
        </footer>
    );
}
