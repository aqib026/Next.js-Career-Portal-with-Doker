import Image from "next/future/image";
import { useState, useEffect } from "react";

import { useGetAllJobPostsQuery } from "../redux/jobPosts/Services";
import gif from '../public/assets/images/gif.gif'
import {
  findJob,
  serviceBackgroundLine,
  vqJobSearchVector,
} from "../public/assets/images";
import JobDetail from "../components/postedJobs/JobDetail";

export default function Home() {
const data={limit:10,pagenum:1}
  const job = useGetAllJobPostsQuery(data);
  const [jobs, setJobs] = useState(job);
  const [query, setQuery] = useState("");

  useEffect(() => {
    setJobs(job);
  }, [job]);

  if (job.isLoading) return (<div style={{position:'absolute', alignItems: 'center', justifyContent:'center', display:'flex', left:0, right:0,bottom:0,top:0}}><Image src={gif} alt="Find Job Banner" /></div>)
  if (job.isError) return <h1>An error occured {job.error.error}</h1>;
  return (
    <div>
      <div className="vq-find-job-BG">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 vq-search-vector">
              <Image src={findJob} alt="Find Job Banner" />
              <div className="vq-job mt-3">
                <p>
                  We Code for you… whatever your needs are, from a simple
                  website, to a sophisticated software solution. We are here to
                  fulfill your requirements in the most professional way. We are
                  committed to help our customers achieve their goals by
                  automating their processes.
                </p>
              </div>
              <div className="input-group mt-4">
                <input
                  type="text"
                  className="form-control vq-job-SEARCH-input"
                  placeholder="Job Search..."
                  aria-label="Recipient's username"
                  aria-describedby="basic-addon2"
                  onChange={(e) => setQuery(e.target.value)}
                  value={query}
                />
                <div className="input-group-append">
                  <button
                    className="btn btn-outline-secondary vq-job-SEARCH-btn"
                    type="button"
                  >
                    <i className="fa-solid fa-magnifying-glass"></i>
                  </button>
                </div>
              </div>
            </div>
            <div className="col-lg-6 vq-search-vector">
              <Image
                className="w-100"
                src={vqJobSearchVector}
                alt="Job Search Vector"
              />
            </div>
          </div>
        </div>
      </div>
      <Image
        className="vq-job-line"
        src={serviceBackgroundLine}
        alt="Service Background Line"
      />
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="vq-job">
              <h1>VQode Jobs</h1>
              <h6>{job.data?.jobPosts.length} Jobs</h6>
            </div>
          </div>
          {jobs ? (
            <>
              {job.data?.jobPosts
                .filter((job) => {
                  if(job.isHiddein != true)
                  {
                    if (query === "") {
                      return job;
                    } else {
                      if (job.title?.toLowerCase().includes(query.toLowerCase())) {
                        return job;
                      }
                    }
                  }
                  else {
                    return null
                  }
               
                })
                .map((item, index) => {
                  return (
                   <JobDetail mykey={index} item={item} index={index}/>
                  );
                })}
            </>
          ) : (
            <p>no jobs available</p>
          )}
        </div>
      </div>
    </div>
  );
}
