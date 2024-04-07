import BmrComp from "../components/BmrComp"
import HeroSection from "../components/HeroSection"
import NutritionPoint from "../components/NutritionPoint"
import SpecialWorkout from "../components/SpecialWorkout"
import TrainingProgram from "../components/TrainingProgram"
import { FloatingNav } from "../components/ui/floating-navbar"

function Home() {
  const navItems = [
    {
      name: "Workouts",
      link: "/allworkout",
    },
    {
      name: "Nutrtions",
      link: "/allnutrition",
    },
    {
      name: "BMR",
      link: "/bmrcalcpage",
    },
  ];

  return (
    <main className="w-full px-2 md:px-9 lg:px-24 py-6 text-white">
      <div className="relative  w-full">
        <FloatingNav navItems={navItems} />
      </div>
      <HeroSection />
      <SpecialWorkout />
      <TrainingProgram />
      <NutritionPoint />
      <BmrComp />
    </main>
  )
}

export default Home
