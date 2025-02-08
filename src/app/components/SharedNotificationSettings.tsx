import { useUser } from '@clerk/nextjs'
import React from 'react'
import { useUpdateUserMutation } from '../state/api'
import {
  NotificationSettingsFormData,
  notificationSettingsSchema
} from '../lib/schemas'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import Header from './Header'
import { Form } from './ui/form'
import { CustomFormField } from './CustomFormField'

const SharedNotificationSettings = ({
  title = 'Notification Setting',
  subtitle = 'Manage your notification settings'
}: SharedNotificationSettingsProps) => {
  const { user } = useUser()
  const { updateUser } = useUpdateUserMutation()
  const currentSettings =
    (user?.publicMetadata as { settings?: UserSettings })?.settings || {}
  const methods = useForm<NotificationSettingsFormData>({
    resolver: zodResolver(notificationSettingsSchema),
    defaultValues: {
      courseNotifications: currentSettings.courseNotifications || false,
      emailAlerts: currentSettings.emailAlerts || false,
      smsAlerts: currentSettings.smsAlerts || false,
      notificationFrequency: currentSettings.notificationFrequency || 'daily'
    }
  })
  const onSubmit = async (data: NotificationSettingsFormData) => {
    if (!user) return

    const updatedUser = {
      userId: user.id,
      publicMetadata: {
        ...user.publicMetadata,
        settings: {
          ...currentSettings,
          ...data
        }
      }
    }
    try {
      await updateUser(updatedUser)
    } catch (error) {
      console.error('Failed to update user settings:', error)
    }
  }
  if (!user) return <div>Please sign in to manage your settings.</div>
  return (
    <div className="notification-settings">
      <Header title={title} subtitle={subtitle} />
      <Form {...methods}>
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          className="notification-settings__form"
        >
          <div className="notification-settings__fields">
            <CustomFormField
              name="courseNotifications"
              label="Course Notifications"
              type="switch"
            />
          </div>
        </form>
      </Form>
    </div>
  )
}

export default SharedNotificationSettings
