import { withViewTransition } from "@/lib/utils";
import { ArrowLeft } from "lucide-react";
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

const BlogCard = ({ children, onClick, is, ...rest }: { children: ReactNode; onClick: () => void; is: string }) => {
    const [handleWithTransition] = useMemo(() => withViewTransition(onClick), [onClick]);
    return (
        <CardWrapper {...rest} is={is} className="w-fit inline-flex !flex-row gap-2 max-w-[400px]">
            <h3 className="block text-1xl text-black dark:text-white w-fit" style={{ viewTransitionName: "heading" }}>
                {children}
            </h3>
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
        <div className="flex flex-col gap-4 px-5 [&_h1]:text-bogoss-300 [&_h1]:text-2xl [&_a]:text-belgoss-500 sm:[&_p]:px-5 max-w-5xl">
            <Markdown className={"mb-12"}>{content}</Markdown>
        </div>
    );
};

export default function Blog() {
    const [selectedBlog, setSelectedBlog] = useState<number | null>(null);

    const onSelect = (id: number) => {
        setSelectedBlog(id);
    };

    return (
        <div className="mt-44 flex flex-col items-center justify-start w-full gap-5">
            {selectedBlog && (
                <div className="w-full ps-2">
                    <button
                        onClick={() => setSelectedBlog(null)}
                        className=""
                        aria-label="go back to the list of blogs">
                        <ArrowLeft className="size-5 text-bogoss-300 " />
                    </button>
                </div>
            )}
            {selectedBlog ? (
                <h3 className="max-w-[50%] text-3xl mb-5 text-center text-black dark:text-white">
                    {blogs.find((blog) => blog.id === selectedBlog)?.title || ""}
                </h3>
            ) : (
                <h1 className="text-5xl !text-belgoss-500 mb-20">Blogs</h1>
            )}
            <div className="flex flex-wrap gap-3">
                {!selectedBlog &&
                    blogs.map((blog) => (
                        <BlogCard key={blog.id} is={blog.id.toString()} onClick={() => onSelect(blog.id)}>
                            {blog.title}
                        </BlogCard>
                    ))}
                {selectedBlog && <Article content={blogs.find((blog) => blog.id === selectedBlog)?.content || ""} />}
            </div>
        </div>
    );
}
