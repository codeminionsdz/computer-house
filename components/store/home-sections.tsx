"use client"

import { useEffect, useMemo, useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import {
  Shield, Truck, Banknote, Headphones, Star, ArrowRight,
  Laptop, Cpu, Mouse, Wifi, Camera, Printer, Package,
  Send, MessageCircle, Monitor, MonitorCheck, Smartphone,
  FileText, HardDrive, Armchair,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ProductCard } from "./product-card"
import { useLocale } from "@/lib/locale-context"
import { collections, testimonials } from "@/lib/data"
import type { Product } from "@/lib/data"
import { getMegaMenuTaxonomy } from "@/app/(store)/actions"
import { getProducts } from "@/app/(store)/actions"

const deptIcons: Record<string, React.ReactNode> = {
  Monitor: <Monitor className="h-6 w-6" />,
  Laptop: <Laptop className="h-6 w-6" />,
  Cpu: <Cpu className="h-6 w-6" />,
  MonitorCheck: <MonitorCheck className="h-6 w-6" />,
  Smartphone: <Smartphone className="h-6 w-6" />,
  Camera: <Camera className="h-6 w-6" />,
  Wifi: <Wifi className="h-6 w-6" />,
  Printer: <Printer className="h-6 w-6" />,
  FileText: <FileText className="h-6 w-6" />,
  Mouse: <Mouse className="h-6 w-6" />,
  HardDrive: <HardDrive className="h-6 w-6" />,
  Armchair: <Armchair className="h-6 w-6" />,
}

export function DepartmentsGrid() {
  const { locale, t } = useLocale()
  const [departments, setDepartments] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let active = true

    async function loadDepartments() {
      setIsLoading(true)
      try {
        const rows = await getMegaMenuTaxonomy()
        if (!active) return
        setDepartments(Array.isArray(rows) ? rows : [])
      } catch (error) {
        console.error("Failed to load departments grid taxonomy:", error)
        if (active) {
          setDepartments([])
        }
      } finally {
        if (active) {
          setIsLoading(false)
        }
      }
    }

    void loadDepartments()

    return () => {
      active = false
    }
  }, [])

  return (
    <section className="mx-auto max-w-7xl px-4 py-16">
      <div className="mb-8 flex items-end justify-between">
        <div>
          <h2 className="font-heading text-2xl font-bold text-foreground sm:text-3xl">
            {t.sections.departments}
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            {locale === "fr" ? "Parcourez nos categories" : "تصفح فئاتنا"}
          </p>
        </div>
        <Link href="/shop" className="hidden sm:inline-flex">
          <Button variant="ghost" className="gap-1 text-primary">
            {t.sections.viewAll}
            <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </div>
      <div className="flex gap-4 overflow-x-auto pb-2 sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 sm:overflow-visible">
        {isLoading &&
          Array.from({ length: 8 }).map((_, i) => (
            <div key={`dept-skeleton-${i}`} className="h-28 min-w-[240px] animate-pulse rounded-xl border border-border bg-muted/40 sm:min-w-0" />
          ))}
        {!isLoading && departments.map((dept, i) => (
          <motion.div
            key={dept.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: i * 0.05 }}
          >
            <Link
              href={`/shop?department=${encodeURIComponent(dept.slug)}`}
              className="group flex min-w-[240px] items-start gap-4 rounded-xl border border-border bg-card p-5 transition-all hover:border-primary/30 hover:shadow-md hover:shadow-primary/5 sm:min-w-0"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                {deptIcons[dept.icon as keyof typeof deptIcons] || <Monitor className="h-6 w-6" />}
              </div>
              <div className="flex-1">
                <h3 className="font-heading text-base font-semibold text-foreground">
                  {locale === "ar" ? dept.name_ar : dept.name_fr}
                </h3>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {(dept.categories || []).slice(0, 3).map((cat: any) => (
                    <span
                      key={cat.id}
                      className="rounded-full bg-muted px-2.5 py-0.5 text-[11px] font-medium text-muted-foreground"
                    >
                      {locale === "ar" ? cat.name_ar : cat.name_fr}
                    </span>
                  ))}
                </div>
              </div>
              <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary rtl:rotate-180 rtl:group-hover:-translate-x-1" />
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

export function CollectionsSection() {
  const { locale, t } = useLocale()

  return (
    <section className="bg-muted/50 py-16">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-8 text-center">
          <h2 className="font-heading text-2xl font-bold text-foreground sm:text-3xl">
            {t.sections.collections}
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            {locale === "fr" ? "Des packs penses pour chaque besoin" : "حزم مصممة لكل حاجة"}
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {collections.map((col, i) => (
            <motion.div
              key={col.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: i * 0.06 }}
            >
              <Link
                href={`/shop?collection=${col.slug}`}
                className="group relative flex flex-col items-center overflow-hidden rounded-xl border border-border bg-card p-6 text-center transition-all hover:border-primary/30 hover:shadow-md"
              >
                <div className={`mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${col.color} text-white shadow-lg`}>
                  <Package className="h-6 w-6" />
                </div>
                <h3 className="font-heading text-sm font-bold text-foreground">
                  {col.name[locale]}
                </h3>
                <p className="mt-1 text-xs text-muted-foreground line-clamp-2">
                  {col.description[locale]}
                </p>
                <span className="mt-3 text-xs font-medium text-primary">
                  {col.productCount} {locale === "fr" ? "produits" : "منتج"}
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function FeaturedProducts() {
  const { locale, t } = useLocale()
  const [tab, setTab] = useState("bestSellers")
  const [products, setProducts] = useState<Array<Product & { created_at?: string }>>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let active = true

    async function loadProducts() {
      setIsLoading(true)
      try {
        const result = await getProducts({ limit: 12 })
        if (!active) return
        const normalized = (result?.products || []).map((product: any) => ({
          id: product.id,
          slug: product.slug,
          name: {
            fr: product.title_fr || "",
            ar: product.title_ar || product.title_fr || "",
          },
          description: {
            fr: product.description_fr || "",
            ar: product.description_ar || product.description_fr || "",
          },
          price: product.price_dzd || 0,
          compareAtPrice: product.compare_at_price_dzd || undefined,
          images: (product.product_images || []).map((image: any) => image.url),
          category: product.categories?.slug || "",
          department: product.departments?.slug || "",
          brand: product.brands?.name || "",
          rating: 5,
          reviewCount: 0,
          inStock: (product.stock || 0) > 0,
          stockCount: product.stock || 0,
          specs: {},
          tags: [],
          isNew: false,
          isBestSeller: Boolean(product.is_featured),
          isDeal: Boolean(product.compare_at_price_dzd && product.compare_at_price_dzd > product.price_dzd),
          created_at: product.created_at,
        }))
        setProducts(normalized)
      } catch (error) {
        console.error("Failed to load featured products:", error)
        if (active) setProducts([])
      } finally {
        if (active) setIsLoading(false)
      }
    }

    void loadProducts()

    return () => {
      active = false
    }
  }, [])

  const latestProducts = useMemo(
    () =>
      [...products].sort((a, b) =>
        (b.created_at || "").localeCompare(a.created_at || "")
      ),
    [products]
  )

  const filtered = {
    bestSellers: products.filter((p) => p.isBestSeller),
    new: latestProducts,
    deals: products.filter((p) => p.isDeal),
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-16">
      <div className="mb-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <h2 className="font-heading text-2xl font-bold text-foreground sm:text-3xl">
            {t.sections.featured}
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            {locale === "fr" ? "Notre selection pour vous" : "اختيارنا لك"}
          </p>
        </div>
        <Link href="/shop">
          <Button variant="ghost" className="gap-1 text-primary">
            {t.sections.viewAll}
            <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </div>

      <Tabs value={tab} onValueChange={setTab}>
        <TabsList className="mb-6 bg-muted">
          <TabsTrigger value="bestSellers">{t.sections.bestSellers}</TabsTrigger>
          <TabsTrigger value="new">{t.sections.newArrivals}</TabsTrigger>
          <TabsTrigger value="deals">{t.sections.deals}</TabsTrigger>
        </TabsList>
        {(Object.keys(filtered) as Array<keyof typeof filtered>).map((key) => (
          <TabsContent key={key} value={key}>
            {isLoading ? (
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={`product-skeleton-${key}-${i}`} className="h-72 animate-pulse rounded-xl border border-border bg-muted/40" />
                ))}
              </div>
            ) : filtered[key].length > 0 ? (
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4">
                {filtered[key].map((product, i) => (
                  <ProductCard key={product.id} product={product} index={i} />
                ))}
              </div>
            ) : (
              <div className="rounded-xl border border-border bg-card p-6 text-center text-sm text-muted-foreground">
                {locale === "fr" ? "Aucun produit pour le moment" : "لا توجد منتجات حاليا"}
              </div>
            )}
          </TabsContent>
        ))}
      </Tabs>
    </section>
  )
}

export function TrustSection() {
  const { t } = useLocale()
  const items = [
    { icon: Shield, title: t.trust.warranty, desc: t.trust.warrantyDesc },
    { icon: Truck, title: t.trust.delivery, desc: t.trust.deliveryDesc },
    { icon: Banknote, title: t.trust.cod, desc: t.trust.codDesc },
    { icon: Headphones, title: t.trust.support, desc: t.trust.supportDesc },
  ]

  return (
    <section className="border-y border-border bg-card py-12">
      <div className="mx-auto max-w-7xl px-4">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: i * 0.08 }}
              className="flex items-start gap-4"
            >
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <item.icon className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-foreground">{item.title}</h3>
                <p className="mt-0.5 text-xs text-muted-foreground">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function TestimonialsSection() {
  const { locale, t } = useLocale()

  return (
    <section className="mx-auto max-w-7xl px-4 py-16">
      <div className="mb-8 text-center">
        <h2 className="font-heading text-2xl font-bold text-foreground sm:text-3xl">
          {t.sections.testimonials}
        </h2>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {testimonials.slice(0, 3).map((item, i) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: i * 0.08 }}
            className="rounded-xl border border-border bg-card p-6"
          >
            <div className="mb-3 flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, j) => (
                <Star
                  key={j}
                  className={`h-4 w-4 ${
                    j < item.rating ? "fill-amber-400 text-amber-400" : "fill-muted text-muted"
                  }`}
                />
              ))}
            </div>
            <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
              {`"${item.text[locale]}"`}
            </p>
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                {item.name[0]}
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">{item.name}</p>
                <p className="text-xs text-muted-foreground">{item.city}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

export function NewsletterSection() {
  const { locale, t } = useLocale()

  return (
    <section className="bg-primary text-primary-foreground">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-8 px-4 py-16 md:flex-row md:justify-between">
        <div className="text-center md:text-start">
          <h2 className="font-heading text-2xl font-bold sm:text-3xl">{t.sections.newsletter}</h2>
          <p className="mt-2 text-sm opacity-80">{t.sections.newsletterSub}</p>
        </div>
        <div className="flex w-full max-w-md gap-2">
          <Input
            type="email"
            placeholder={t.sections.emailPlaceholder}
            className="border-primary-foreground/20 bg-primary-foreground/10 text-primary-foreground placeholder:text-primary-foreground/50"
          />
          <Button variant="secondary" className="shrink-0 gap-1.5">
            <Send className="h-4 w-4" />
            {t.sections.subscribe}
          </Button>
        </div>
      </div>
      {/* WhatsApp CTA */}
      <div className="border-t border-primary-foreground/10">
        <div className="mx-auto flex max-w-7xl items-center justify-center gap-3 px-4 py-4">
          <MessageCircle className="h-5 w-5 text-green-300" />
          <a
            href="https://wa.me/213550000000"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium hover:underline"
          >
            {t.sections.whatsappCta}
          </a>
        </div>
      </div>
    </section>
  )
}