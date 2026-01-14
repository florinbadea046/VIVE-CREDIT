import { Star } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Suspense } from "react";

type Testimonial = {
  name: string;
  role: string;
  text: string;
};

const TestimonialsSection = () => {
  const { t } = useTranslation("landing");

  const rawTestimonials = t("testimonials.items", { returnObjects: true });
  const testimonials: Testimonial[] = Array.isArray(rawTestimonials)
    ? rawTestimonials
    : [];

  return (
    <section className="py-24 px-4 bg-white dark:bg-slate-900 transition-colors">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white text-center">
          {t("testimonials.title")}
        </h2>

        <p className="text-slate-600 dark:text-slate-400 text-center mt-3">
          {t("testimonials.subtitle")}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-14">
          {testimonials.map((item, index) => (
            <div
              key={index}
              className="bg-gray-50 dark:bg-slate-800 
                         p-8 rounded-2xl shadow-md 
                         border border-slate-200 dark:border-slate-700 
                         transition flex flex-col h-full justify-between"
            >
              <div className="flex flex-col gap-6 h-full justify-between">
                <div>
                  <div className="flex gap-1 mb-4">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star
                        key={i}
                        className="w-5 h-5 text-yellow-400 fill-yellow-400"
                      />
                    ))}
                  </div>

                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                    “{item.text}”
                  </p>
                </div>

                <div>
                  <p className="font-semibold text-slate-900 dark:text-white mt-6">
                    {item.name}
                  </p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    {item.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default function TestimonialsSectionWrapper() {
  return (
    <Suspense fallback={<div>Loading testimonials...</div>}>
      <TestimonialsSection />
    </Suspense>
  );
}
