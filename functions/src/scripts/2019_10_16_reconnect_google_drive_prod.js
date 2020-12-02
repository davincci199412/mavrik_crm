import admin from 'firebase-admin'
import { createGoogleFolderForContainer } from '../app/index'
import shareGoogleFileWithMembers from '../app/googleDrive/shareGoogleFileWithMembers'
import { collectionResolver } from '..//utils/firestore'
import createNotificationChannel from '../app/googleDrive/createNotificationChannel'

export default async () => {
  const fStore = admin.firestore()
  try {
    const uid = 'XC9JPLrqdQftOJIJ6Oj8RAfYyY53'
    const orgId = 'xOHJLOp57OwK5ChUiId3'

    const organizationDoc = await fStore.doc(`organizations/${orgId}`).get()
    const organization = organizationDoc.data()

    const integrationDoc = await fStore
      .doc(`integration/gDrive/users/${uid}`)
      .get()
    const integration = integrationDoc.data()

    await fStore.doc(`gDriveIndex/${orgId}`).set({})

    // await collectionResolver(
    //   fStore.collection('deals').where('orgId', '==', orgId),
    //   async dealDoc => {
    //     const deal = dealDoc.data()
    //     if (!deal.googleFolder) {
    //       const dealFolderId = await createGoogleFolderForContainer({
    //         entity: deal,
    //         entityType: 'deal',
    //         integration
    //       })
    //       await shareGoogleFileWithMembers(
    //         deal.orgId,
    //         dealFolderId,
    //         deal.members
    //       )
    //     }
    //   },
    //   10
    // )

    // await collectionResolver(
    //   fStore.collection('projects').where('orgId', '==', orgId),
    //   async projectDoc => {
    //     const project = projectDoc.data()
    //     if (!project.googleFolder) {
    //       const projectFolderId = await createGoogleFolderForContainer({
    //         entity: project,
    //         entityType: 'project',
    //         integration
    //       })
    //       await shareGoogleFileWithMembers(
    //         project.orgId,
    //         projectFolderId,
    //         project.members
    //       )
    //     }
    //   },
    //   10
    // )

    // await createNotificationChannel(
    //   orgId,
    //   organization.googleDrive.id,
    //   integration
    // )
  } catch (error) {
    console.log('error', error)
  }
}
