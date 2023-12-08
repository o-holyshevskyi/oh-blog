import Date from "@/components/date/date";
import { Divider } from "@nextui-org/divider";
import { title } from "@/components/primitives";

export default function Education() {
    return (
        <>
            <div>
                <h1 className={title({ size: 'xs' })}>Sumy State University</h1>
                <div className="flex h-5 items-center space-x-4 text-small mb-5 mt-5">
                    <div>
                        <Date dateString='2016-09-01' /> - <Date dateString='2018-03-31' />
                    </div>
                    <Divider orientation="vertical" />
                    <p>Master's degree, Material science</p>
                </div>
            </div>
            <div>
                <h1 className={title({ size: 'xs' })}>Sumy State University</h1>
                <div className="flex h-5 items-center space-x-4 text-small mb-5 mt-5">
                    <div>
                        <Date dateString='2012-09-01' /> - <Date dateString='2016-05-31' />
                    </div>
                    <Divider orientation="vertical" />
                    <p>Bachelor's degree, Material science</p>
                </div>
            </div>
        </>
    );
}
