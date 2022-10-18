import { useState } from "react";
import {
    useGetConfigQuery,
    useLazyGetMostPopularQuery,
} from "../../features/apis/baseApi";

import VisibilitySensor from "react-visibility-sensor";

import { CarouselsPostCard } from "../";

const MostPopular = ({ data, className }) => {
    const [load, setLoad] = useState(true);
    const [content, setContent] = useState(null);

    const { data: config } = useGetConfigQuery();
    const [trigger] = useLazyGetMostPopularQuery();

    const onChange = async (isVisible) => {
        if (isVisible) {
            if (!content) {
                const { data: posts, isSuccess } = await trigger();
                if (isSuccess) {
                    console.log(posts.result.length);
                    setContent(
                        <>
                            {posts.result.length ? (
                                <CarouselsPostCard
                                    className={className}
                                    config={config}
                                    data={data}
                                    posts={posts}
                                />
                            ) : (
                                ""
                            )}
                        </>
                    );
                    setLoad(() => {
                        return posts?.result?.length ? true : false;
                    });
                }
            }
        }
    };

    return (
        <VisibilitySensor onChange={onChange}>
            <div className={`step ${load ? "" : "disable"}`}>{content}</div>
        </VisibilitySensor>
    );
};

export default MostPopular;
