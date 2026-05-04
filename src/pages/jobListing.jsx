import { getJobs } from '@/api/apiJobs'
import useFetch from '@/hooks/use-fetch'
import { useUser } from '@clerk/react'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { BarLoader } from 'react-spinners'
import JobCard from '@/components/job-card'
import { getCompanies } from '@/api/apiCompanies'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { State } from 'country-state-city'
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

const JobListing = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [location, setLocation] = useState("");
  const [company_id, setCompany_id] = useState("");
  const { isLoaded } = useUser();

  const [page, setPage] = useState(1);
  const jobsPerPage = 6;

  const { fn: fnJobs, data: jobs, loading: loadingJobs } = useFetch(getJobs, {
    location,
    company_id,
    searchQuery,
  });

  const { fn: fnCompanies, data: companies } = useFetch(getCompanies);

  useEffect(() => {
    if (isLoaded) fnCompanies();
  }, [isLoaded]);

  useEffect(() => {
    if (isLoaded) fnJobs();
  }, [isLoaded, location, company_id, searchQuery]);

  // 🔥 Reset page when filters change
  useEffect(() => {
    setPage(1);
  }, [location, company_id, searchQuery]);

  const handleSearch = (e) => {
    e.preventDefault();
    let formData = new FormData(e.target);
    const query = formData.get("search-query");
    if (query) setSearchQuery(query);
  };

  const clearFilters = () => {
    setSearchQuery("");
    setCompany_id("");
    setLocation("");
  };

  // 🔥 Pagination logic
  const start = (page - 1) * jobsPerPage;
  const end = start + jobsPerPage;

  const paginatedJobs = jobs?.slice(start, end) || [];
  const totalPages = jobs ? Math.ceil(jobs.length / jobsPerPage) : 0;

  if (!isLoaded) {
    return <BarLoader className='mb-4' width={"100%"} color='#36d7b7'/>
  }

  return (
    <div>
      <h2 className='gradient-title font-extrabold text-6xl sm:text-7xl text-center pb-8'>Latest Jobs</h2>

      <form
        onSubmit={handleSearch}
        className="h-14 flex flex-row w-full gap-2 items-center mb-3"
      >
        <Input
          type="text"
          placeholder="Search Jobs by Title.."
          name="search-query"
          className="h-full flex-1 px-4 text-md"
        />
        <Button type="submit" className="h-full sm:w-28" variant="blue">
          Search
        </Button>
      </form>

      <div className="flex flex-col sm:flex-row gap-2">
        <Select value={location} onValueChange={(value) => setLocation(value)}>
          <SelectTrigger>
            <SelectValue placeholder="Filter by Location" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {State.getStatesOfCountry("IN").map(({ name }) => (
                <SelectItem key={name} value={name}>
                  {name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>

        <Select
          value={company_id}
          onValueChange={(value) => setCompany_id(value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Filter by Company" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {companies?.map(({ name, id }) => (
                <SelectItem key={name} value={id}>
                  {name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>

        <Button className="sm:w-1/2" variant="destructive" onClick={clearFilters}>
          Clear Filters
        </Button>
      </div>

      {loadingJobs && (
        <BarLoader className='mt-4' width={"100%"} color='#36d7b7'/>
      )}

      {loadingJobs === false && (
        <div className='mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-4'>
          {paginatedJobs.length ? (
            paginatedJobs.map((job) => (
              <JobCard
                key={job.id}
                job={job}
                savedInit={job?.saved?.length > 0}
              />
            ))
          ) : (
            <div>No Jobs Found</div>
          )}
        </div>
      )}

      {totalPages > 0 && (
        <Pagination>
          <PaginationContent>

            {/* Previous */}
            <PaginationItem>
              <PaginationPrevious
                onClick={() => page > 1 && setPage(page - 1)}
              />
            </PaginationItem>

            {/* Page Numbers */}
            {Array.from({ length: totalPages }, (_, i) => (
              <PaginationItem key={i}>
                <PaginationLink
                  isActive={page === i + 1}
                  onClick={() => setPage(i + 1)}
                >
                  {i + 1}
                </PaginationLink>
              </PaginationItem>
            ))}

            {/* Next */}
            <PaginationItem>
              <PaginationNext
                onClick={() => page < totalPages && setPage(page + 1)}
              />
            </PaginationItem>

          </PaginationContent>
        </Pagination>
      )}
    </div>
  )
}

export default JobListing