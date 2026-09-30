import PageHeader from '../components/layout/PageHeader'
import ApplicationFlowSection from '../components/sections/ApplicationFlowSection'
import ApplicationDemoSection from '../components/sections/ApplicationDemoSection'

/* Application — page under the Hardware nav group.
   The flow module below shows how HumanPlus human data feeds robot
   autonomous-manipulation research. */
export default function ApplicationPage() {
  return (
    <>
      <PageHeader
        label="Data"
        title="Application"
        description="Application scenarios and case studies will be listed here."
      />
      <ApplicationFlowSection />
      <ApplicationDemoSection />
    </>
  )
}
