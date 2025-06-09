import React from 'react'
import Image from 'next/image'
import { payment } from '@/data/content'

const PaymentPage = () => 
  {
  return (
    <div className='w-full h-full bg-[#e4f05ef0] relative py-36 px-14 '>

      <Image src="/img/bg.png" fill className='object-cover' alt='bg' />

      <div className='max-w-8xl flex justify-content-between content-center mx-auto'>

        <div className='w-1/3'>
          <div className="py-3 px-2 w-1/3 bg-[#b9c34deb] text-center text-black text-[12px] font-medium">ESTIMATE</div>
          <p className="py-8 text-6xl font-bold text-black ">
            YOUR
            <span className="relative block py-4">
              <span className="absolute top-[56px] h-5 bg-white transform -translate-y-1/2 w-[280px] ml-1"></span>
              <span className="relative">PAYMENT</span>
            </span>
            ESTIMATE
          </p>
        </div>

        <div className='w-2/3 '>
          <form action="" className='w-full flex justify-between flex-wrap space-y-4'>
            <div className='w-1/2'>
              <label htmlFor="purchasePrice" className="text-sm block pb-2 font-semibold text-black">PURCHASE PRICE :</label>
              <input type="number" id="purchasePrice" name="purchasePrice" placeholder="6382" className='text-black border-1 border-black w-4/5 px-6 py-5' />
            </div>
            <div className='w-1/2'>
              <label htmlFor="downPayment" className="text-sm block pb-2 font-semibold text-black">DOWN PAYMENT %:</label>
              <input type="number" id="downPayment" name="downPayment" placeholder="20" className='text-black border-1 border-black w-4/5 px-6 py-5' />
            </div>
            <div className='w-1/2 my-4'>
              <label htmlFor="loantermYear" className="text-sm block pb-2 font-semibold text-black">LOAN TERM YEAR :</label>
              <input type="number" id="loantermYear" name="loantermYear" placeholder="35" className='text-black border-1 border-black w-4/5 px-6 py-5' />
            </div>
            <div className='w-1/2 my-4'>
              <label htmlFor="interestRate" className="text-sm block pb-2 font-semibold text-black">INTEREST RATE %:</label>
              <input type="number" id="interestRate" name="interestRate" placeholder="5.5" className='text-black border-1 border-black w-4/5 px-6 py-5' />
            </div>
            <button className='bg-black py-4 px-8 my-10 text-white text-md font-semibold'>Estimate Payment</button>
          </form>
        </div>

        <div className='w-1/5 bg-white border border-black text-center space-y-10 p-10 h-full'>
          {
            payment.map((payment, index) => (
              <div key={index}>
                <p className='text-[12px] text-[#6877ab] font-semibold'>{payment.title}:</p>
                <strong className='text-2xl text-black font-semibold'>${payment.amount}</strong>
              </div>
            ))
          }
        </div>

      </div>
      
    </div>
  )
}

export default PaymentPage
