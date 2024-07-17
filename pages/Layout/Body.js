import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";

import { setUserUpdatedData } from "../../redux/userReducer";
import Nav from "../../components/Nav";
import Overview from "../../components/Overview";
import JobSearchTab from "../../components/JobSearchTab";
import Searchtab from "../../components/Searchtab";
import TablesTop from "../../components/Tables/TablesTop";
import TablesHeading from "../../components/Tables/TablesHeading";
import TablesBody from "../../components/Tables/TablesBody";
import TablesFooter from "../../components/Tables/TablesFooter";

export default function Body({handlePage,pagenum}) {
  const dispatch = useDispatch();
  const router = useRouter();
  const pathName = router.pathname;

  const [path, setPath] = useState("");
  const [searchAction, setSearchAction] = useState("");
  const [query, setQuery] = useState("");
  const [limit, setLimit] = useState(10);
  const [tottlaPages,setTottalPages]=useState()

  useEffect(() => {
    {
      pathName == "/jobPosts"
        ? setPath("job")
        : pathName == "/assignment"
        ? setPath("assignment")
        : pathName == "/jobApplications"
        ? setPath("jobApplications")
        : setPath("users");
    }
  }, [pathName]);

  return (
    <div className="col-lg-12 p-0 mainPadding">
      <Nav />
      <div className="topbar mobile-none">
        <div className="row">
          <div className="col-lg-12 topbarFlex">
            <i className="fa-solid fa-bell bell mt-6"></i>
          </div>
        </div>
      </div>
      <div id="main">
        <Overview path={path} />
        {path != "jobApplications" ? (
          <JobSearchTab
            path={path}
            setQuery={setQuery}
            setSearchAction={setSearchAction}
            searchAction={searchAction}
            query = {query}
          />
        ) : (
          <Searchtab
            path={path}
            setQuery={setQuery}
            setSearchAction={setSearchAction}
            searchAction={searchAction}
            query={query}
          />
        )}
        <div className="box box-padding mt-4">
          <TablesTop 
            path={path} 
            limit={limit} 
            setLimit={setLimit}
          />
          <table className="table table-striped mt-4 table-responsive">
            <TablesHeading path={path} />

            <TablesBody
              pathName={pathName}
              setUserUpdatedData={setUserUpdatedData}
              searchAction={searchAction}
              query={query}
              pagenum={pagenum}
              setTottalPages={setTottalPages}
              limit={limit}
            />
          </table>
        </div>
        <TablesFooter handlePage={handlePage} pagenum={pagenum} tottlaPages={tottlaPages}/>
 </div>
    </div>
  );
}
