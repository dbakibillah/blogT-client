import { useState, useEffect } from "react";
import axios from "axios";
import { Table, kaReducer } from "ka-table";
import { DataType, SortingMode } from "ka-table/enums";
import "ka-table/style.css";

const FeaturedBlogs = () => {
    const [blogs, setBlogs] = useState([]);
    const [tableProps, setTableProps] = useState({
        columns: [
            {
                key: "index",
                title: "#",
                dataType: DataType.Number,
                style: { width: "50px" },
            },
            {
                key: "title",
                title: "Title",
                dataType: DataType.String,
            },
            {
                key: "author",
                title: "Author",
                dataType: DataType.String,
            },
            {
                key: "category",
                title: "Category",
                dataType: DataType.String,
            },
            {
                key: "wordCount",
                title: "Word Count",
                dataType: DataType.Number,
            },
        ],
        data: [],
        rowKeyField: "index",
        sortingMode: SortingMode.Single,
    });

    useEffect(() => {
        axios
            .get("https://blog-t-server.vercel.app/featured")
            .then((response) => {
                const dataWithIndex = response.data.map((blog, index) => ({
                    index: index + 1,
                    ...blog,
                }));
                setBlogs(dataWithIndex);
                setTableProps((prevProps) => ({ ...prevProps, data: dataWithIndex }));
            })
            .catch((error) => console.error("Error fetching featured blogs:", error));
    }, []);

    return (
        <section className="bg-gray-100 dark:bg-gray-900">
            <div className="container mx-auto p-4 dark:bg-gray-900 dark:text-gray-200">
                <h1 className="text-2xl font-bold mb-4">Featured Blogs</h1>
                <Table
                    {...tableProps}
                    dispatch={(action) => {
                        const newState = kaReducer(tableProps, action);
                        setTableProps(newState);
                    }}
                    className="rounded-lg shadow-lg bg-white dark:bg-gray-800 dark:text-gray-200"
                />
            </div>
        </section>
    );
};

export default FeaturedBlogs;
