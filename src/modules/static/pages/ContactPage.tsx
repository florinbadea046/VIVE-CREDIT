import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Phone, Mail, MapPin } from "lucide-react";
import { useTranslation } from "react-i18next";

const ContactPage = () => {
  const { t } = useTranslation("static");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const [success, setSuccess] = useState("");

  const validateEmail = (value: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess("");

    if (!validateEmail(email)) {
      setErrorEmail(t("contact.form.emailError"));
      return;
    }

    setErrorEmail("");
    setSuccess(t("contact.form.successMessage"));
    setEmail("");
    setMessage("");
  };

  return (
    <>
      <Helmet>
        <title>{t("contact.meta.title")}</title>
        <meta name="description" content={t("contact.meta.description")} />
      </Helmet>

      <div className="min-h-screen bg-white dark:bg-slate-900 py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">
            {t("contact.headline")}
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mt-2">
            {t("contact.subheadline")}
          </p>

          <div className="grid md:grid-cols-3 gap-6 mt-12">
            <div className="p-6 rounded-2xl border bg-white dark:bg-slate-800 shadow-sm hover:shadow-md transition">
              <Phone className="w-8 h-8 text-blue-600 mb-4" />
              <h3 className="font-semibold text-slate-900 dark:text-white text-lg">
                {t("contact.cards.phone.title")}
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-300 mt-1">
                {t("contact.cards.phone.availability")}
              </p>
              <p className="text-blue-600 mt-3 font-medium">
                {t("contact.cards.phone.number")}
              </p>
            </div>

            <div className="p-6 rounded-2xl border bg-white dark:bg-slate-800 shadow-sm hover:shadow-md transition">
              <Mail className="w-8 h-8 text-blue-600 mb-4" />
              <h3 className="font-semibold text-slate-900 dark:text-white text-lg">
                {t("contact.cards.email.title")}
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-300 mt-1">
                {t("contact.cards.email.responseTime")}
              </p>
              <p className="text-blue-600 mt-3 font-medium">
                {t("contact.cards.email.address")}
              </p>
            </div>

            <div className="p-6 rounded-2xl border bg-white dark:bg-slate-800 shadow-sm hover:shadow-md transition">
              <MapPin className="w-8 h-8 text-blue-600 mb-4" />
              <h3 className="font-semibold text-slate-900 dark:text-white text-lg">
                {t("contact.cards.location.title")}
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-300 mt-1">
                {t("contact.cards.location.description")}
              </p>
              <p className="text-blue-600 mt-3 font-medium">
                {t("contact.cards.location.address")}
              </p>
            </div>
          </div>

          <div className="mt-20 flex justify-center">
            <div className="w-full max-w-2xl">
              <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-4">
                {t("contact.form.title")}
              </h2>

              <p className="text-slate-600 dark:text-slate-400 mb-8">
                {t("contact.form.description")}
              </p>

              <form
                onSubmit={handleSubmit}
                className="space-y-6 bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-md border border-slate-200 dark:border-slate-700"
              >
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    {t("contact.form.emailLabel")}
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={t("contact.form.emailPlaceholder")}
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition"
                  />
                  {errorEmail && (
                    <span className="text-red-500 text-sm">{errorEmail}</span>
                  )}
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    {t("contact.form.messageLabel")}
                  </label>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder={t("contact.form.messagePlaceholder")}
                    rows={5}
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition resize-none"
                  />
                </div>

                {success && (
                  <div className="text-green-600 dark:text-green-400 text-sm">
                    {success}
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition shadow-md active:scale-[0.98]"
                >
                  {t("contact.form.submitButton")}
                </button>
              </form>
            </div>
          </div>

          <div className="mt-20">
            <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-6">
              {t("contact.map.title")}
            </h2>

            <div className="rounded-2xl overflow-hidden shadow-lg border border-slate-300 dark:border-slate-700">
              <iframe
                title="Google Maps"
                width="100%"
                height="400"
                loading="lazy"
                allowFullScreen
                className="rounded-2xl dark:brightness-90"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2849.636216319363!2d26.10253831553557!3d44.4396639791024!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40b1ff3eb3af5ad5%3A0x89ebc75189da4227!2sBucharest!5e0!3m2!1sen!2sro!4v1234567890"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactPage;
