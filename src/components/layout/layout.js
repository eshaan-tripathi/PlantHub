import React from "react";
import Header from "./header";
import Footer from "./footer";
import { Helmet } from "react-helmet";

const Layout = ({
    children,
    title = "PlantHub - shop now",
    description = "mern stack project",
    keywords = "mern,react,mongo,node",
    author = "Techinfoyt",
}) => {
    return (
        <div>
            <Helmet>
                <meta charSet="utf-8" />
                <meta name="description" content={description} />
                <meta name="keywords" content={keywords} />
                <meta name="author" content={author} />
                <title>{title}</title>
            </Helmet>
            <Header />
            <main style={{ minHeight: "70vh" }}>{children}</main>
            <Footer />
        </div>
    );
};

export default Layout;
