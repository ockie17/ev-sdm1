import Stripe from 'stripe'
import { createClient } from '@/lib/supabase/server'

function getStripe() {
  if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error('STRIPE_SECRET_KEY is not set')
  }
  return new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: '2025-02-24.acacia',
  })
}

export async function createStripeCustomer(userId: string, email: string) {
  try {
    const stripe = getStripe()
    const customer = await stripe.customers.create({
      email,
      metadata: {
        userId,
      },
    })

    const supabase = await createClient()
    await supabase
      .from('teams')
      .update({ stripe_customer_id: customer.id })
      .eq('created_by', userId)
      .is('stripe_customer_id', null)
      .single()

    return customer
  } catch (error) {
    console.error('Error creating Stripe customer:', error)
    throw error
  }
}

export async function createCheckoutSession(
  customerId: string,
  priceId: string,
  userId: string
) {
  try {
    const stripe = getStripe()
    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      mode: 'subscription',
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/settings/billing?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/settings/billing`,
      metadata: {
        userId,
      },
    })

    return session
  } catch (error) {
    console.error('Error creating checkout session:', error)
    throw error
  }
}

export async function getCustomerPortalUrl(customerId: string) {
  try {
    const stripe = getStripe()
    const portalSession = await stripe.billingPortal.sessions.create({
      customer: customerId,
      return_url: `${process.env.NEXT_PUBLIC_APP_URL}/settings/billing`,
    })

    return portalSession.url
  } catch (error) {
    console.error('Error creating portal session:', error)
    throw error
  }
}

export async function getSubscriptionStatus(customerId: string) {
  try {
    const stripe = getStripe()
    const subscriptions = await stripe.subscriptions.list({
      customer: customerId,
      limit: 1,
    })

    return subscriptions.data[0] || null
  } catch (error) {
    console.error('Error fetching subscription:', error)
    throw error
  }
}
