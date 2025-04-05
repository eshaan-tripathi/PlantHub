import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import useCategory from "../hooks/useCategory";
import Layout from "../components/Layout/Layout";

const Categories = () => {
  const categories = useCategory();

  useEffect(() => {
    console.log("Categories:", categories);
  }, [categories]);

  return (
    <Layout title={"All Categories"}>
      <div className="container" style={{ marginTop: "100px" }}>
        <div className="row container">
          {categories.length > 0 ? (
            categories.map((c) => (
              <div key={c._id} className="col-md-4">
                <div className="card">
                <Link to={`/category/${c.slug}`} className="cat-cards"><h1>{c.name}</h1></Link>

                </div>
              </div>
            ))
          ) : (
            <p>No categories found</p>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Categories;