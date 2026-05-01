import React, { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom';
import { Button } from './ui/button';
import { Show, SignIn, SignInButton, SignUpButton, UserButton, useUser } from '@clerk/react'
import { PenBox } from 'lucide-react';
import { BriefcaseBusiness, Heart } from 'lucide-react';

const Header = () => {
  const [showSignIn, setShowSignIn] = useState(false);
  const [search, setSearch] = useSearchParams();
  const {user} = useUser();

  useEffect(()=>{
    if (search.get('sign-in')){
      setShowSignIn(true);
    }
  }, [search])

  const handleOverlayClick = (e)=>{
    if (e.target === e.currentTarget){
      setShowSignIn(false)
      setSearch({})
    }
  }
  return (
  <>
    <nav className="py-4 flex justify-between items-center">
        <Link>
        <img src="/logo.png" className='h-20'/>
        </Link>

      <div className='flex gap-8'>
        <Show when="signed-out">
           <Button className='me-4' variant="outline" onClick={()=>setShowSignIn(true)} >
              Login
          </Button>
        </Show>

        <Show when="signed-in">
          {user?.unsafeMetadata?.role === 'recruiter' && (
            <Link to='/post-job'>
            <Button variant="destructive" className="rounded-full">
              <PenBox size={20} className='mr-2'/>
              Post a Job
            </Button>
          </Link>)}
          <UserButton appearance={{
            elements: {
              avatarBox: "!w-10 !h-10"
            }
          }}>
            <UserButton.MenuItems>
                <UserButton.Link
                  label="My Jobs"
                  labelIcon={<BriefcaseBusiness size={15} />}
                  href="/my-jobs"
                />
                <UserButton.Link
                  label="Saved Jobs"
                  labelIcon={<Heart size={15} />}
                  href="/saved-jobs"
                />
                <UserButton.Action label="manageAccount" />
              </UserButton.MenuItems>

          </UserButton>
        </Show>

      </div>
    </nav> 

    {showSignIn && 
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-md" onClick={handleOverlayClick}>
      <SignIn
      signUpForceRedirectUrl='/onboarding'
      fallbackRedirectUrl='/onboarding'/>
      </div>}
    </>
  );
};

export default Header