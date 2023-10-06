import Date from "../../date/date";

export default function MyExperience({
    experience 
}: { 
    experience: { 
        startTime: string; 
        endTime: string, 
        companyName: string; 
        description: string }[] 
    }) {
    experience = experience.sort((a, b) => {
        if (a.startTime < b.startTime) {
            return 1;
        } else {
            return -1;
        }
    })
    return (
        <>
            {
                experience.map((exp, index) => (
                    <div key={index}>
                        <Date dateString={exp.startTime}></Date> - <Date dateString={exp.endTime}></Date>
                        <h2>{exp.companyName}</h2>
                        <p>{exp.description}</p>
                    </div>
                ))
            }
        </>
    );
}
