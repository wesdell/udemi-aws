"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { motion } from "framer-motion";

import { useCarousel } from "@/hooks/useCarousel";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetCoursesQuery } from "@/state/api";
import CourseCardSearch from "@/components/CourseCardSearch";

const LoadingSkeleton = () => {
  return (
    <div className="landing-skeleton">
      <div className="landing-skeleton__hero">
        <div className="landing-skeleton__hero-content">
          <Skeleton className="landing-skeleton__title" />
          <Skeleton className="landing-skeleton__subtitle" />
          <Skeleton className="landing-skeleton__subtitle-secondary" />
          <Skeleton className="landing-skeleton__button" />
        </div>
        <Skeleton className="landing-skeleton__hero-image" />
      </div>
      <div className="landing-skeleton__featured">
        <Skeleton className="landing-skeleton__featured-title" />
        <Skeleton className="landing-skeleton__featured-description" />
        <div className="landing-skeleton__tags">
          {
            [1, 2, 3, 4, 5]
              .map((_, idx) => (
                <Skeleton key={idx} className="landing-skeleton__tag" />
              ))
          }
        </div>
        <div className="landing-skeleton__courses">
          {
            [1, 2, 3, 4]
              .map((_, idx) => (
                <Skeleton key={idx} className="landing-skeleton__course-card" />
              ))
          }
        </div>
      </div>
    </div>
  );
}

const Landing = () => {
  const router = useRouter();
  const currentImage = useCarousel({ totalImages: 3 });
  const { data: courses, isLoading, isError } = useGetCoursesQuery({});

  const handleCourseClick = (courseId: string) => {
    router.push(`/search/id=${courseId}`, { scroll: false });
  };

  if (isLoading) {
    return <LoadingSkeleton />
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="landing"
    >
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="landing__hero"
      >
        <div className="landing__hero-content">
          <h1 className="landing__title">Course</h1>
          <p className="landing__description">
            This is the list of the courses you can enrroll in.
            <br />
            Courses when you need them and want them.
          </p>
          <div className="landing__cta">
            <Link href="/search" scroll={false}>
              <div className="landing__cta-buttton">
                Search for courses
              </div>
            </Link>
          </div>
        </div>
        <div className="landing__hero-images">
          {
            ["/hero1.jpg", "/hero2.jpg", "/hero3.jpg"]
              .map((src, idx) => (
                <Image
                  key={src}
                  src={src}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  alt={`Hero banner ${idx + 1}`}
                  fill
                  priority={idx === currentImage}
                  className={`landing__hero-image ${idx === currentImage ? "landing__hero-image--active" : ""}`}
                />
              ))
          }
        </div>
      </motion.div>
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ amount: 0.3, once: true }}
        className="landing__featured"
      >
        <h2 className="landing__featured-title">
          Featured Courses
        </h2>
        <p className="landing__featured-description">
          From beginner to advance, in all industries, we have the right courses just for you
          and preparing your entire journey for learning
          and making the most.
        </p>
        <div className="landing__tags">
          {
            ["web development", "enterprise IT", "react nextjs"]
              .map((tag, idx) => (
                <span key={idx} className="landing__tag">
                  {tag}
                </span>
              ))
          }
        </div>
        <div className="landing__courses">
          {
            courses && courses.slice(0, 4).map((course, idx) => (
              <motion.div
                key={course.courseId}
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: idx * 0.2 }}
                viewport={{ amount: 0.4 }}
              >
                <CourseCardSearch
                  course={course}
                  onClick={() => handleCourseClick(course.courseId)}
                />
              </motion.div>
            ))
          }
        </div>
      </motion.div>
    </motion.div>
  );
}

export default Landing;