import { Button } from '@/components/ui/button'
import React from 'react'
import { Link } from 'react-router-dom'
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel'
import companies from '../data/companies.json'
import Autoplay from 'embla-carousel-autoplay'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import faqs from "../data/faq.json";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const LandingPage = () => {
  return (
    <main className='flex flex-col gap-10 sm:gap-20 py-10 sm:py-20 ml-'>
        <section className='text-center'>
            <h1 className='flex flexx-col items-center justify-center gradient-title text-4xl font-extrabold sm:text-6xl lg:text-8xl tracking-tighter py-4'>Find Your Dream Job {" "}
            </h1>
            <div className="flex flexx-col items-center justify-center gradient-title text-4xl font-extrabold sm:text-6xl lg:text-8xl tracking-tighter py-4">and get {" "} 
                    <img src='/logo.png' alt='hired-sign' className='h-14 sm:h-24 lg:h-32'/>
                </div>

            <p className='text-gray-300 sm:mt-4 text-xs sm:text-xl'>
                Explore thousands of job listings or find the perfect candidate
            </p>
        </section>

        <div className='flex gap-6 justify-center'>
            {/*button*/}
            <Link to='/jobs'>
                <Button variant="blue" size="xl">Find Jobs</Button>    
            </Link>
            <Link to='/post-job'>
                <Button variant="destructive" size="xl">Post a job</Button>    
            </Link>
        </div>

        {/*carousel*/}
         <Carousel plugins={[Autoplay({ delay: 2000 })]} className="w-full py-10">
            <CarouselContent className="flex gap-5 sm:gap-20 items-center">
                {companies.map(({name, id, path})=>{
                    return (
                        <CarouselItem key={id} className="basis-1/3 lg:basis-1/6">
                            <img src={path} alt={name} 
                            className='h-9 sm:h-14 object-contain'/>
                        </CarouselItem>
                        );
                    })}
            </CarouselContent>
        </Carousel>
  
        

        {/* banner*/}
        <div className='flex justify-center'>
        <img src="/banner.jpg" className='h-3/4 w-7/12'/>
        </div>
        <section className='grid grid-cols-1 md:grid-cols-2 gap-4 mx-6 my-10'>
            {/*cards*/}
            <Card>
                <CardHeader>
                    <CardTitle>For Job Seekers</CardTitle>
                </CardHeader>
                <CardContent>
                    Search and apply for jobs, track application, and more.
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>For Employers</CardTitle>
                </CardHeader>
                <CardContent>
                    Post jobs, manage applications, and find the best candidates.
                </CardContent>
            </Card>
        </section>

        {/* Accordian */}
        <Accordion type="multiple" className="w-full max-w-8xl mx-auto px-4">
        {faqs.map((faq, index) => (
          <AccordionItem key={index} value={`item-${index + 1}`}>
            <AccordionTrigger>{faq.question}</AccordionTrigger>
            <AccordionContent>{faq.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </main>

  )
}

export default LandingPage