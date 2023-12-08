import { Chip } from "@nextui-org/chip";
import { ArrowTopInSquareIcon } from "../icons";
import { Link } from "@nextui-org/link";

export default function Tags({ tags } : { tags: string[] }) {
    return (
        <div className="flex-col items-center justify-center mt-10 w-full">
            {tags.map((tag, index) => (
                <Link 
                    key={index}
                    href={`/blog/filtered/${tag.replace('#', '').toLowerCase()}`}
                >
                    <Chip 
                        color="primary"
                        variant="shadow"
                        key={index}
                        size='lg'
                        startContent={<ArrowTopInSquareIcon className="items-center" size={19} />}
                        className="cursor-pointer m-2"
                    >
                        {tag}
                    </Chip>    
                </Link>
            ))}
        </div>
    )
}