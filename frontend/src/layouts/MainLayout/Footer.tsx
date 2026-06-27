export default function Footer() {
  return (
    <footer className="border-t border-white/20 py-4 text-center">
      <p className="text-sm text-slate-500 dark:text-slate-400">
        &copy; {new Date().getFullYear()} AMKA Medical Center - Kindu, Maniema, RDC. Tous droits réservés.
      </p>
    </footer>
  )
}