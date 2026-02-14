"use client"
import { useState, useEffect, useCallback } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowRight, Star, Zap, Award } from "lucide-react"
import { useLocale } from "@/lib/locale-context"

type SlideData = {
  id: number
  titleFr: string
  titleAr: string
  descFr: string
  descAr: string
  badgeFr: string
  badgeAr: string
  imageSrc: string
  color: string
  bgColor: string
}

const slides: SlideData[] = [
  {
    id: 1,
    titleFr: "Laptops & PC",
    titleAr: "حواسيب محمولة",
    descFr: "Les derniers modèles des grandes marques",
    descAr: "أحدث موديلات العلامات الكبرى",
    badgeFr: "Prix imbattables",
    badgeAr: "أسعار لا تقبل المنافسة",
    imageSrc: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=1920&q=80",
    color: "#6366F1",
    bgColor: "#EEF2FF"
  },
  {
    id: 2,
    titleFr: "Apple Premium",
    titleAr: "منتجات أبل",
    descFr: "MacBook, iPhone, iPad, AirPods",
    descAr: "ماك بوك، آيفون، آيباد، إيربودز",
    badgeFr: "Garantie officielle",
    badgeAr: "ضمان رسمي",
    imageSrc: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1920&q=80",
    color: "#8B5CF6",
    bgColor: "#F5F3FF"
  },
  {
    id: 3,
    titleFr: "Casques & Audio",
    titleAr: "سماعات وصوتيات",
    descFr: "Gaming, Studio, Sans fil premium",
    descAr: "ألعاب، ستوديو، لاسلكي فاخر",
    badgeFr: "Qualité supérieure",
    badgeAr: "جودة عالية",
    imageSrc: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=1920&q=80",
    color: "#EC4899",
    bgColor: "#FDF2F8"
  },
  {
    id: 4,
    titleFr: "Caméras Pro",
    titleAr: "كاميرات احترافية",
    descFr: "DSLR, Mirrorless, Accessoires photo",
    descAr: "DSLR، ميرورليس، إكسسوارات تصوير",
    badgeFr: "Conseil expert",
    badgeAr: "استشارة خبراء",
    imageSrc: "https://media.istockphoto.com/id/1163005791/photo/bare-tree-new-pond.jpg?s=170667a&w=0&k=20&c=KHZ7oETz8oFL2zG4_Hos2QCl3s3Z4q0nuGfrS-gD8Q0=",
    color: "#F59E0B",
    bgColor: "#FFFBEB"
  }
]

export function HeroSliderModern() {
  const { locale } = useLocale()
  const [current, setCurrent] = useState(0)

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % slides.length)
  }, [])

  useEffect(() => {
    const timer = setInterval(next, 5000)
    return () => clearInterval(timer)
  }, [next])

  const slide = slides[current]
  const isArabic = locale === "ar"

  return (
    <div 
      className="relative w-full h-screen overflow-hidden transition-colors duration-700"
      style={{ backgroundColor: slide.bgColor }}
    >
      
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          
          {/* Content Container */}
          <div className="relative h-full flex items-center">
            <div className="w-full max-w-[95rem] mx-auto px-6 md:px-12 lg:px-20">
              
              <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                
                {/* Left - Text Content */}
                <div className={`space-y-8 ${isArabic ? 'lg:order-2 text-right' : 'text-left'}`}>
                  
                  {/* Badge */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full border-2"
                    style={{ 
                      borderColor: slide.color,
                      backgroundColor: `${slide.color}10`
                    }}
                  >
                    <Star className="w-4 h-4" style={{ color: slide.color }} fill={slide.color} />
                    <span className="text-sm font-semibold" style={{ color: slide.color }}>
                      {isArabic ? slide.badgeAr : slide.badgeFr}
                    </span>
                  </motion.div>

                  {/* Main Title */}
                  <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-6xl md:text-7xl lg:text-8xl font-bold leading-tight"
                    style={{ 
                      color: slide.color,
                      fontFamily: "'Inter', 'Cairo', sans-serif"
                    }}
                  >
                    {isArabic ? slide.titleAr : slide.titleFr}
                  </motion.h1>

                  {/* Description */}
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="text-2xl md:text-3xl font-medium text-gray-700"
                  >
                    {isArabic ? slide.descAr : slide.descFr}
                  </motion.p>

                  {/* Features */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="grid grid-cols-3 gap-6 pt-4"
                  >
                    {[
                      { icon: Zap, textFr: "Livraison rapide", textAr: "توصيل سريع" },
                      { icon: Award, textFr: "Garantie", textAr: "ضمان" },
                      { icon: Star, textFr: "Qualité", textAr: "جودة" }
                    ].map((item, i) => (
                      <div key={i} className="text-center">
                        <item.icon 
                          className="w-8 h-8 mx-auto mb-2" 
                          style={{ color: slide.color }}
                          strokeWidth={1.5}
                        />
                        <div className="text-sm font-medium text-gray-600">
                          {isArabic ? item.textAr : item.textFr}
                        </div>
                      </div>
                    ))}
                  </motion.div>

                  {/* CTA */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="flex flex-wrap gap-4 pt-4"
                  >
                    <Link href="/products">
                      <motion.button
                        className="group inline-flex items-center gap-3 px-8 py-4 rounded-full font-semibold text-white text-lg shadow-lg"
                        style={{ backgroundColor: slide.color }}
                        whileHover={{ scale: 1.03, boxShadow: `0 20px 40px ${slide.color}40` }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <span>{isArabic ? 'تصفح المنتجات' : 'Voir produits'}</span>
                        <ArrowRight 
                          className={`w-5 h-5 transition-transform group-hover:translate-x-1 ${isArabic ? 'rotate-180 group-hover:-translate-x-1' : ''}`} 
                        />
                      </motion.button>
                    </Link>
                    
                    <Link href="/contact">
                      <motion.button
                        className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold text-lg border-2"
                        style={{ 
                          borderColor: slide.color,
                          color: slide.color
                        }}
                        whileHover={{ 
                          scale: 1.03,
                          backgroundColor: `${slide.color}10`
                        }}
                        whileTap={{ scale: 0.98 }}
                      >
                        {isArabic ? 'اتصل بنا' : 'Contact'}
                      </motion.button>
                    </Link>
                  </motion.div>

                </div>

                {/* Right - Image */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3, duration: 0.8 }}
                  className={`relative h-[500px] lg:h-[650px] ${isArabic ? 'lg:order-1' : ''}`}
                >
                  <div className="relative w-full h-full rounded-3xl overflow-hidden shadow-2xl">
                    <img 
                      src={slide.imageSrc}
                      alt={isArabic ? slide.titleAr : slide.titleFr}
                      className="w-full h-full object-cover"
                    />
                    
                    {/* Subtle gradient overlay */}
                    <div 
                      className="absolute inset-0"
                      style={{
                        background: `linear-gradient(135deg, ${slide.color}15, transparent 60%)`
                      }}
                    />

                    {/* Floating badge */}
                    <motion.div
                      className="absolute top-6 right-6 px-4 py-2 rounded-full bg-white/95 backdrop-blur-sm shadow-lg"
                      animate={{
                        y: [0, -10, 0]
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    >
                      <div className="text-xs font-bold" style={{ color: slide.color }}>
                        COMPUTER HOUSE
                      </div>
                    </motion.div>
                  </div>

                  {/* Decorative elements */}
                  <motion.div
                    className="absolute -bottom-6 -left-6 w-24 h-24 rounded-2xl shadow-xl"
                    style={{ backgroundColor: slide.color }}
                    animate={{
                      rotate: [0, 10, 0],
                      scale: [1, 1.05, 1]
                    }}
                    transition={{
                      duration: 5,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                  <motion.div
                    className="absolute -top-6 -right-6 w-32 h-32 rounded-full"
                    style={{ backgroundColor: `${slide.color}20` }}
                    animate={{
                      scale: [1, 1.1, 1]
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                </motion.div>

              </div>

            </div>
          </div>

        </motion.div>
      </AnimatePresence>

      {/* Navigation Dots */}
      <div className="absolute bottom-10 md:bottom-12 left-1/2 -translate-x-1/2 flex gap-3 z-20">
        {slides.map((s, i) => (
          <button
            key={s.id}
            onClick={() => setCurrent(i)}
            className="relative group"
          >
            <motion.div
              className="h-2 rounded-full transition-all duration-500"
              style={{
                width: i === current ? '48px' : '12px',
                backgroundColor: i === current ? s.color : `${s.color}40`
              }}
              whileHover={{ width: '48px' }}
            />
          </button>
        ))}
      </div>

      {/* Counter */}
      <div 
        className="absolute top-10 md:top-12 right-6 md:right-12 text-sm font-semibold tracking-wider z-20"
        style={{ color: `${slide.color}80` }}
      >
        {String(current + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
      </div>

      {/* Logo */}
      <div className={`absolute top-10 md:top-12 ${isArabic ? 'right-auto left-6 md:left-12' : 'left-6 md:left-12'} z-20`}>
        <div className="font-bold text-2xl md:text-3xl" style={{ color: slide.color }}>
          COMPUTER HOUSE
        </div>
        <div className="text-xs tracking-[0.3em] font-medium" style={{ color: `${slide.color}60` }}>
          MAISON TECH
        </div>
      </div>

    </div>
  )
}