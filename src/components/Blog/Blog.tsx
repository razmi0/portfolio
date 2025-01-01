import { withViewTransition } from "@/lib/utils";
import { useMemo, useState, type ReactNode } from "react";
import Markdown from "react-markdown";
import { blogs } from "../../data/blog.json";
import CardWrapper from "../Home/Cards/CardWrapper";
import { Button } from "../ui/button";

type Blog = {
    id: number;
    title: string;
    content: string;
};

const BlogCard = ({ children, onClick, is }: { children: ReactNode; onClick: () => void; is: string }) => {
    const [handleWithTransition] = useMemo(() => withViewTransition(onClick), [onClick]);
    return (
        <CardWrapper is={is} className="w-fit inline-flex !flex-row">
            <h3 className="block text-1xl !text-bogoss-300 w-fit">{children}</h3>
            <Button
                onClick={handleWithTransition}
                className="whitespace-nowrap"
                variant="outline"
                ariaLabel={`go read ${children}`}>
                Read it
            </Button>
        </CardWrapper>
    );
};

const Article = ({ content }: { content: string }) => {
    return (
        <div className="flex flex-col gap-4 px-5 [&_h1]:text-bogoss-300 [&_h1]:text-2xl">
            <Markdown>{content}</Markdown>
        </div>
    );
};

export default function Blog() {
    const [selectedBlog, setSelectedBlog] = useState<number | null>(null);

    const onSelect = (id: number) => {
        setSelectedBlog(id);
    };

    return (
        <div className="mt-44 flex flex-col items-start justify-start h-[95vh] w-full">
            <div className="inline-flex justify-between">
                {selectedBlog ? (
                    <h3 className="!text-belgoss-500 max-w-[50%]">
                        {blogs.find((blog) => blog.id === selectedBlog)?.title || ""}
                    </h3>
                ) : (
                    <h1 className="text-5xl !text-belgoss-500 mb-20">Blogs</h1>
                )}

                {selectedBlog && (
                    <Button
                        onClick={() => setSelectedBlog(null)}
                        className="mb-10 h-fit"
                        variant="outline"
                        ariaLabel="go back to the list of blogs">
                        Back to the list
                    </Button>
                )}
            </div>
            <div className="flex flex-col gap-3">
                {!selectedBlog &&
                    blogs.map((blog) => (
                        <div key={blog.id} className="flex flex-col gap-4">
                            <BlogCard is={blog.id.toString()} onClick={() => onSelect(blog.id)}>
                                {blog.title}
                            </BlogCard>
                        </div>
                    ))}
                {selectedBlog && <Article content={blogs.find((blog) => blog.id === selectedBlog)?.content || ""} />}
            </div>
        </div>
    );
}
