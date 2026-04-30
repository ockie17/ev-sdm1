import { createClient } from '@/lib/supabase/server'
import { createCheckoutSession } from '@/lib/stripe'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()

    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { priceId } = body

    if (!priceId) {
      return NextResponse.json({ error: 'Price ID is required' }, { status: 400 })
    }

    // Get or create Stripe customer
    let { data: team } = await supabase
      .from('teams')
      .select('stripe_customer_id')
      .eq('created_by', user.id)
      .single()

    let customerId = team?.stripe_customer_id

    if (!customerId) {
      // Create new Stripe customer
      const stripe = await import('stripe')
      const stripeClient = new stripe.default(process.env.STRIPE_SECRET_KEY || '', {
        apiVersion: '2025-02-24.acacia',
      })

      const customer = await stripeClient.customers.create({
        email: user.email,
        metadata: {
          userId: user.id,
        },
      })

      customerId = customer.id

      // Save customer ID to database
      await supabase
        .from('teams')
        .update({ stripe_customer_id: customerId })
        .eq('created_by', user.id)
    }

    // Create checkout session
    const session = await createCheckoutSession(customerId, priceId, user.id)

    return NextResponse.json({ sessionUrl: session.url })
  } catch (error) {
    console.error('Error creating checkout session:', error)
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    )
  }
}
