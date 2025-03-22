import React from "react";

const DoctorPage = () => {
  return (
    <div className="min-h-screen bg-[#e7e7e7] pt-24 md:pt-36">
      <div className="max-w-6xl mx-auto px-4 md:p-8 space-y-8 md:space-y-12">
        {/* Doctor Section */}
        <div className="flex flex-col md:flex-row items-start space-y-6 md:space-y-0 md:space-x-10 bg-white/50 backdrop-blur-sm rounded-2xl p-4 md:p-8 shadow-lg">
          {/* Image Container (Left Side) */}
          <div className="bg-white rounded-2xl shadow-lg p-2 w-full md:w-[500px] h-48 md:h-64 flex justify-center items-center">
            <img
              src="https://voaxktqgbljtsattacbn.supabase.co/storage/v1/object/sign/sahasra-hospital-images/Jyothi-Diagnosis/doctor-image.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJzYWhhc3JhLWhvc3BpdGFsLWltYWdlcy9KeW90aGktRGlhZ25vc2lzL2RvY3Rvci1pbWFnZS5qcGciLCJpYXQiOjE3NDAzMTM0NjAsImV4cCI6MTg5Nzk5MzQ2MH0.Hs_Hs_Hs_Hs_Hs_Hs_Hs_Hs_Hs_Hs_Hs_Hs_Hs_Hs_Hs_Hs_Hs"
              alt="Dr. JYOTHI R.G"
              className="w-full h-full rounded-xl object-cover"
            />
          </div>

          {/* Doctor Details (Right Side) */}
          <div className="space-y-3 md:space-y-4 w-full">
            <h2 className="text-xl md:text-2xl font-bold text-teal-700">DR JYOTHI R.G</h2>
            <p className="text-sm md:text-base font-semibold text-gray-700">
              Designation: <span className="font-normal">SENIOR CONSULTANT</span>
            </p>
            <p className="text-sm md:text-base font-semibold text-gray-700">
              Specialization: <span className="font-normal">RADIOLOGY</span>
            </p>
            <p className="text-sm md:text-base font-semibold text-gray-700">
              Work Experience: <span className="font-normal">15 years</span>
            </p>
            <p className="text-sm md:text-base font-semibold text-gray-700">
              Practice location: <span className="font-normal">MADANAPALLE</span>
            </p>

            {/* Additional Details */}
            <div className="mt-4 md:mt-6 space-y-4 md:space-y-5">
              <section>
                <h3 className="text-base md:text-lg font-semibold text-gray-800 mb-2">Education & Training</h3>
                <ul className="list-disc list-inside text-sm md:text-base text-gray-700 space-y-1">
                  <li>MBBS – Davangere, Karnataka</li>
                  <li>DNB - Kamineni Hospitals, Hyderabad</li>
                  <li>Fellowship in Fetal Medicine</li>
                  <li>Fellowship in Gynecological Imaging</li>
                  <li>Fellowship in Musculoskeletal (M.S.K) MRI Imaging</li>
                </ul>
              </section>

              <section>
                <h3 className="text-base md:text-lg font-semibold text-gray-800 mb-2">Achievements & Awards</h3>
                <p className="text-sm md:text-base text-gray-700">
                  Presented papers in state and national-level conferences. Invited as a faculty in conferences.
                </p>
              </section>

              <section>
                <h3 className="text-base md:text-lg font-semibold text-gray-800 mb-2">Research & Publications</h3>
                <ul className="list-decimal list-inside text-sm md:text-base text-gray-700 space-y-1">
                  <li>Coexisting Diabetic macular edema and Choroidal neovascularization – Indian Journal of Ophthalmology</li>
                  <li>A Diagnostic and therapeutic case challenge – The Retina Journal</li>
                </ul>
              </section>
            </div>
          </div>
        </div>

        {/* Book Your Scan Section with Glassmorphism Effect */}
        <div 
          className="relative rounded-2xl p-6 md:p-10 text-center space-y-4 md:space-y-5 backdrop-blur-lg shadow-2xl border border-white/40"
          style={{ backgroundColor: "#e3f3fb" }}
        >
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Book Your Scans with Confidence</h2>
          <p className="text-base md:text-lg text-gray-700">
            Experience top-notch diagnostics with our expert doctors and state-of-the-art equipment.
          </p>
          <button className="w-full md:w-auto px-6 py-3 bg-teal-600 text-white rounded-xl text-base font-semibold hover:bg-teal-700 transition-all duration-200">
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default DoctorPage