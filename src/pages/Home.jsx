import Banner from "../components/Banner";
import FAQSection from "../components/FAQSection";
import MostPopularBlogs from "../components/MostPopularBlogs";
import Newsletter from "../components/Newsletter";
import PopularAuthors from "../components/PopularAuthor";
import RecentBlogs from "../components/RecentBlogs";
import TrendingCategories from "../components/TrendingCategories";

const Home = () => {
    return (
        <section className="dark:bg-gray-900">
            <Banner />
            <RecentBlogs />
            <MostPopularBlogs />
            <TrendingCategories />
            <PopularAuthors />
            <FAQSection />
            <Newsletter />
        </section>
    );
};

export default Home;