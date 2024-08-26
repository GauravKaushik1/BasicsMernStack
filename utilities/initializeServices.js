const Service = require('../models/Service.Model'); 

const initializeDefaultServices = async () => {
    try {
        const existingServices = await Service.find();
        if (!existingServices || existingServices.length === 0) {
            const defaultServices = [
                {
                    service: "Advanced Data Analytics",
                    description: "Providing in-depth analysis and insights from complex data sets using advanced statistical methods and machine learning algorithms.",
                    price: "@2000 - 5000 USD",
                    provider: "Data Insights PhD Solutions"
                },
                {
                    service: "Custom Software Development",
                    description: "Designing and developing bespoke software solutions tailored to specific business needs, from concept to deployment.",
                    price: "@3000 - 10000 USD",
                    provider: "Innovative Code Labs"
                },
                {
                    service: "AI and Machine Learning Consultation",
                    description: "Offering expert guidance on implementing AI and machine learning models to solve real-world problems and optimize processes.",
                    price: "@2500 - 7000 USD",
                    provider: "AI Excellence Advisory"
                },
                {
                    service: "Academic Research and Writing",
                    description: "Assisting with research projects, writing academic papers, and providing expert review and editing for scholarly articles.",
                    price: "@1500 - 4000 USD",
                    provider: "Scholarly Research Services"
                },
                {
                    service: "Database Design and Optimization",
                    description: "Creating efficient and scalable database architectures and optimizing existing databases for performance and reliability.",
                    price: "@1800 - 4500 USD",
                    provider: "Optimal Database Solutions"
                },
                {
                    service: "Cybersecurity Consulting",
                    description: "Assessing and improving security measures for systems and networks to protect against cyber threats and vulnerabilities.",
                    price: "@2200 - 6000 USD",
                    provider: "SecureTech PhD Consultancy"
                },
                {
                    service: "Cloud Computing Solutions",
                    description: "Implementing and managing cloud infrastructure solutions to enhance scalability, flexibility, and cost-efficiency for businesses.",
                    price: "@2500 - 5500 USD",
                    provider: "Cloud Innovators Inc."
                }
            ];

            
            await Service.insertMany(defaultServices, {ordered: false});
            console.log('\x1b[36mDefault services created successfully.\x1b[0m');
        }
    } catch (error) {
        console.error("Error occurred when checking or creating the default services: ", error);
    }
};

module.exports = initializeDefaultServices;