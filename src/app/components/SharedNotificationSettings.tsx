import { useUser } from '@clerk/nextjs'
import React from 'react'
import { useUpdateUserMutation } from '../state/api'
import {
  NotificationSettingsFormData,
  notificationSettingsSchema
} from '../lib/schemas'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

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
  }
  return <div></div>
}

export default SharedNotificationSettings
