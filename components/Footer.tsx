import Link from 'next/link';

export default function Footer() {
  return (
    <footer id="footer" className="bg-[#646464] px-4 py-10 text-white/90 sm:px-6 md:py-12">
      <div className="mx-auto grid max-w-[1080px] grid-cols-2 gap-x-4 gap-y-10 text-center font-sans text-[12px] leading-relaxed sm:gap-8 sm:text-[14px] lg:grid-cols-4">
        <div>
          <h4 className="mb-3 text-[13px] font-semibold uppercase tracking-[0.08em] text-white sm:mb-4 sm:text-[14px]">Help</h4>
          <nav className="flex flex-col gap-1.5">
            <a href="#footer" className="footer-link">FAQs</a>
            <a href="#footer" className="footer-link">London Showroom</a>
            <a href="#footer" className="footer-link">Regional Showroom</a>
            <a href="#footer" className="footer-link">Privacy Policy</a>
            <a href="#footer" className="footer-link">Refund Policy</a>
            <a href="#footer" className="footer-link">Shipping Policy</a>
            <a href="#footer" className="footer-link">Terms of Service</a>
          </nav>
        </div>

        <div>
          <h4 className="mb-3 text-[13px] font-semibold uppercase tracking-[0.08em] text-white sm:mb-4 sm:text-[14px]">Our London Showroom</h4>
          <p>
            123 Design Studio Road<br />
            Creative Quarter<br />
            London<br />
            SW1A 1AA
          </p>
          <p className="mt-4">+44 (0) 20 0000 0000</p>
          <a href="mailto:info@example.com" className="footer-link mt-4 inline-block">
            info@example.com
          </a>
          <p className="mt-4">
            Mon–Fri: 0900–1700<br />
            Sat: 1000–1600<br />
            Sun: Closed
          </p>
          <p className="mt-4">
            VAT number: GB 000 0000 00<br />
            Company Number: 00000000
          </p>
        </div>

        <div>
          <h4 className="mb-3 text-[13px] font-semibold uppercase tracking-[0.08em] text-white sm:mb-4 sm:text-[14px]">Our Regional Showroom</h4>
          <p>
            456 Heritage Business Park<br />
            Unit 12B<br />
            Yorkshire<br />
            HG1 1AA
          </p>
          <p className="mt-4">+44 (0) 1632 960000</p>
          <a href="mailto:support@example.com" className="footer-link mt-4 inline-block">
            support@example.com
          </a>
          <p className="mt-4">
            Mon–Fri: 0900–1700<br />
            Sat: Closed<br />
            Sun: Closed
          </p>
        </div>


        <div>
          <h4 className="mb-3 text-[13px] font-semibold uppercase tracking-[0.08em] text-white sm:mb-4 sm:text-[14px]">Get Connected</h4>
          <div className="flex justify-center gap-4 pt-2">
            <a href="#footer" aria-label="Facebook" className="footer-social footer-social-facebook">f</a>
            <a href="#footer" aria-label="Instagram" className="footer-social footer-social-instagram">◎</a>
            <a href="#footer" aria-label="Pinterest" className="footer-social footer-social-pinterest">p</a>
            <a href="#footer" aria-label="Houzz" className="footer-social footer-social-houzz">H</a>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-12 flex max-w-[1160px] flex-col items-center justify-between gap-5 border-t border-white/20 pt-6 font-sans text-[12px] text-white/90 sm:mt-16 sm:flex-row">
        <span>
          © 2026 European Heritage <b className="font-normal text-white/50">|</b>
        </span>
        <div className="flex flex-wrap justify-center gap-1.5" aria-label="Accepted payment methods">
          <span className="payment-badge payment-amex">AM<br />EX</span>
          <span className="payment-badge payment-apple">Pay</span>
          <span className="payment-badge payment-google">G Pay</span>
          <span className="payment-badge payment-mastercard">●●</span>
          <span className="payment-badge payment-shop">shop</span>
          <span className="payment-badge payment-visa">VISA</span>
        </div>
      </div>
    </footer>
  );
}
