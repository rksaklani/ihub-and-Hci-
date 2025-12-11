import Image from 'next/image'

export default function SupportedBy() {
  return (
    <section className="py-16 bg-gradient-to-b from-white to-primary/5">
      <div className="container mx-auto px-2 sm:px-4 md:px-6">
        <h2 className="text-3xl font-bold text-center mb-12 text-primary">Supported By</h2>
        <div className="flex justify-center items-center">
          <div className="glass rounded-lg p-6 md:p-8">
            <div className="relative w-full max-w-2xl h-32 md:h-40 mx-auto">
              <Image
                src="/assets/img/bef3fb7a-73dd-42df-8959-1dedd7258fbb-1024x226.png"
                alt="Department of Science and Technology (DST) Government of India"
                fill
                className="object-contain"
              />
            </div>
            <div className="text-gray-600 text-center mt-4">
              <p className="text-lg">Department of Science and Technology (DST)</p>
              <p className="text-lg">Government of India</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

