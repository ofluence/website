import { AnimatePresence, motion } from 'motion/react'

import { cn } from '@/utils/global.utils'
import { fadeInUp } from '@/utils/motion.utils'

import {
  AnimatedStaggerGrid,
  AnimatedStaggerItem,
  FadeInView,
} from '@/components/ui/animated-container'
import { Card, CardContent } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

import { LANDING_HOW_IT_WORKS } from '@/constants/landing.constants'

const STEP_GRADIENTS = [
  'from-chart-1/10 to-chart-1/5 bg-gradient-to-br',
  'from-chart-2/10 to-chart-2/5 bg-gradient-to-br',
  'from-chart-3/10 to-chart-3/5 bg-gradient-to-br',
  'from-chart-4/10 to-chart-4/5 bg-gradient-to-br',
]

function LandingHowItWorks() {
  const tabKeys = Object.keys(LANDING_HOW_IT_WORKS)

  return (
    <section id="how-it-works" className="bg-muted/30 py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        {/* Section header */}
        <motion.div className="mb-12 text-center md:mb-16" {...fadeInUp}>
          <p className="text-primary mb-3 text-sm font-medium tracking-widest uppercase">
            Simple process
          </p>
          <h2 className="font-display text-3xl font-semibold tracking-tight md:text-4xl lg:text-5xl">
            Get started in minutes
          </h2>
          <p className="text-muted-foreground mx-auto mt-4 max-w-lg text-lg">
            Whether you&apos;re a brand, agency, or creator — the workflow is simple.
          </p>
        </motion.div>

        <FadeInView className="mx-auto max-w-5xl">
          <Tabs defaultValue={tabKeys[0]}>
            <div className="mb-10 flex justify-center">
              <TabsList>
                {tabKeys.map((key) => (
                  <TabsTrigger key={key} value={key}>
                    {LANDING_HOW_IT_WORKS[key].label}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>

            <AnimatePresence mode="wait">
              {tabKeys.map((key) => (
                <TabsContent key={key} value={key}>
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    <AnimatedStaggerGrid className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
                      {LANDING_HOW_IT_WORKS[key].steps.map((step, index) => (
                        <AnimatedStaggerItem key={step.title}>
                          <Card
                            className={cn(
                              'hover:shadow-soft-md h-full border-0 transition-shadow duration-300',
                              STEP_GRADIENTS[index]
                            )}
                            size="sm"
                          >
                            <CardContent className="flex flex-col gap-3">
                              {/* Step indicator */}
                              <div className="flex items-center gap-3">
                                <div className="bg-primary text-primary-foreground font-display flex size-10 shrink-0 items-center justify-center rounded-full text-sm font-semibold">
                                  {index + 1}
                                </div>
                                {index < LANDING_HOW_IT_WORKS[key].steps.length - 1 && (
                                  <div className="from-primary/40 hidden h-0.5 flex-1 rounded-full bg-gradient-to-r to-transparent lg:block" />
                                )}
                              </div>
                              <div>
                                <h3 className="font-display text-base font-semibold">
                                  {step.title}
                                </h3>
                                <p className="text-muted-foreground mt-1 text-sm leading-relaxed">
                                  {step.description}
                                </p>
                              </div>
                            </CardContent>
                          </Card>
                        </AnimatedStaggerItem>
                      ))}
                    </AnimatedStaggerGrid>
                  </motion.div>
                </TabsContent>
              ))}
            </AnimatePresence>
          </Tabs>
        </FadeInView>
      </div>
    </section>
  )
}

export { LandingHowItWorks }
